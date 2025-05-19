import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchOrders } from "~/apis/endpoints";
import Card from "~/components/CardDashboard/CardDashboard";
import { formatVND } from "~/utils/formatters";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchOrders()
      .then((res) => {
        setOrders(res || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    if (!selectedMonth) return orders;
    return orders.filter((order) => {
      const createdAt = order.createdAt ? dayjs(order.createdAt) : null;
      if (!createdAt) return false;
      if (selectedDay) {
        return (
          createdAt.month() + 1 === selectedMonth &&
          createdAt.date() === selectedDay
        );
      }
      return createdAt.month() + 1 === selectedMonth;
    });
  }, [orders, selectedMonth, selectedDay]);

  const totalOrders = filteredOrders.length;

  const ordersByStatus = useMemo(() => {
    const statusMap = {};
    filteredOrders.forEach((order) => {
      const status = order.status || "UNKNOWN";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    return Object.entries(statusMap).map(([status, count]) => ({
      _id: status,
      count,
    }));
  }, [filteredOrders]);

  const revenueData = useMemo(() => {
    if (selectedMonth && selectedDay) {
      const total = filteredOrders.reduce(
        (sum, o) =>
          o.status === "COMPLETED" ? sum + (o.totalPrice || 0) : sum,
        0
      );
      return [
        {
          _id: { month: selectedMonth, day: selectedDay },
          total,
          count: filteredOrders.filter((o) => o.status === "COMPLETED").length,
        },
      ];
    } else if (selectedMonth) {
      const map = {};
      filteredOrders.forEach((order) => {
        if (order.status !== "COMPLETED") return;
        const createdAt = order.createdAt ? dayjs(order.createdAt) : null;
        if (!createdAt) return;
        const day = createdAt.date();
        if (!map[day]) map[day] = { total: 0, count: 0 };
        map[day].total += order.totalPrice || 0;
        map[day].count += 1;
      });
      return Object.entries(map).map(([day, val]) => ({
        _id: { day: Number(day), month: selectedMonth },
        total: val.total,
        count: val.count,
      }));
    } else {
      const map = {};
      orders.forEach((order) => {
        if (order.status !== "COMPLETED") return;
        const createdAt = order.createdAt ? dayjs(order.createdAt) : null;
        if (!createdAt) return;
        const month = createdAt.month() + 1;
        if (!map[month]) map[month] = { total: 0, count: 0 };
        map[month].total += order.totalPrice || 0;
        map[month].count += 1;
      });
      return Object.entries(map).map(([month, val]) => ({
        _id: { month: Number(month) },
        total: val.total,
        count: val.count,
      }));
    }
  }, [orders, filteredOrders, selectedMonth, selectedDay]);

  const processedRevenueData = (revenueData || []).map((item) => {
    const id = item._id;
    if (id && typeof id === "object") {
      if (id.day && id.month) {
        return { ...item, label: `Ngày ${id.day}/${id.month}` };
      }
      if (id.day) {
        return { ...item, label: `Ngày ${id.day}` };
      }
      if (id.month) {
        return { ...item, label: `Tháng ${id.month}` };
      }
    }
    if (typeof id === "number") {
      return { ...item, label: `Tháng ${id}` };
    }
    return { ...item, label: "" };
  });

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex sm:flex-nowrap flex-wrap justify-between items-center mb-6 gap-5">
        <h1 className="text-xl font-medium">Thống kê đơn mua</h1>
        <div className="flex sm:flex-nowrap flex-wrap gap-4">
          <DatePicker
            picker="month"
            placeholder="Chọn tháng"
            style={{ width: 150 }}
            value={selectedMonth ? dayjs().month(selectedMonth - 1) : null}
            onChange={(date) => {
              setSelectedMonth(date ? date.month() + 1 : null);
              setSelectedDay(null);
            }}
            allowClear
          />
          <DatePicker
            picker="date"
            placeholder="Chọn ngày"
            style={{ width: 150 }}
            value={selectedDay ? dayjs().date(selectedDay) : null}
            onChange={(date) => {
              setSelectedDay(date ? date.date() : null);
            }}
            allowClear
            disabled={!selectedMonth}
            disabledDate={(current) => {
              if (!selectedMonth) return true;
              return current.month() + 1 !== selectedMonth;
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Tổng đơn mua" value={totalOrders} />
        <Card
          title="Đơn thành công"
          value={ordersByStatus.find((b) => b._id === "COMPLETED")?.count || 0}
        />
        <Card
          title="Doanh thu"
          value={`${formatVND(
            revenueData.reduce((sum, item) => sum + item.total, 0) || 0
          )}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Đơn mua theo trạng thái</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={ordersByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="_id"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {ordersByStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Doanh thu</h2>
          {processedRevenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={processedRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <Tooltip
                  formatter={(value) => [`${formatVND(value)}`, "Doanh thu"]}
                  labelFormatter={(id) => {
                    if (id && typeof id === "object") {
                      if (id.day && id.month) {
                        return `Ngày ${id.day} tháng ${id.month}`;
                      }
                      if (id.day) {
                        return `Ngày ${id.day}`;
                      }
                      if (id.month) {
                        return `Tháng ${id.month}`;
                      }
                    }
                    if (typeof id === "number") {
                      return `Tháng ${id}`;
                    }
                    return "";
                  }}
                />
                <YAxis
                  tickFormatter={(value) => Math.ceil(value / 1000) + "k"}
                />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[350px]">
              <p className="text-gray-500">
                Không có dữ liệu doanh thu cho khoảng thời gian đã chọn
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
