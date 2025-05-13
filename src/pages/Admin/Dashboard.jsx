import React from "react";

const Dashboard = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Quản lý thống kê</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">Tổng khóa học</div>
        <div className="bg-white rounded shadow p-4">Tổng học sinh</div>
        <div className="bg-white rounded shadow p-4">Khóa học đang xử lý</div>
        <div className="bg-white rounded shadow p-4">Đánh giá gần đây</div>
      </div>
    </div>
  );
};

export default Dashboard;
