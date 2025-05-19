/* eslint-disable react-hooks/exhaustive-deps */
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCart,
  fetchCart,
  fetchOrders,
  fetchVouchers,
} from "~/apis/endpoints";
import Social from "~/assets/images/social.png";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Star from "~/components/Star/Star";
import { addToCart as addToCartRedux, updateCart } from "~/redux/cartSlice";
import { formatVND } from "~/utils/formatters";
import Logo from "/logo.jpg";
import Loading from "~/components/Loading/Loading";

const CourseHeading = ({ courseInfo }) => {
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [carts, setCarts] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [orders, setOrders] = useState([]);

  const totalLessons = courseInfo?.courseModules?.reduce(
    (acc, module) => acc + module?.lessons?.length,
    0
  );
  const discountValue = Math.ceil(
    (courseInfo?.price * courseInfo?.discount) / 100 || 0
  );
  const voucherValue =
    Math.ceil(courseInfo?.price * voucher?.discount) / 100 || 0;
  const totalPrice = courseInfo?.price - discountValue - voucherValue;

  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeVoucherCode = (e) => setVoucherCode(e.target.value);

  const handleVoucherCode = () => {
    if (!voucherCode) {
      toast.error("Vui lòng nhập mã voucher!!!");
      return;
    }

    setLoadingButton(true);
    const foundVoucher = voucherList?.find(
      (voucher) =>
        voucher.code === voucherCode &&
        voucher.courseIds.includes(courseInfo?.id) &&
        new Date() < new Date(voucher.expiredAt)
    );

    if (!foundVoucher) {
      toast.error("Voucher không hợp lệ!!!");
      setLoadingButton(false);
      return;
    }

    setVoucher(foundVoucher);
    setLoadingButton(false);
  };

  const handleNavigate = () => {
    const foundOrder = orders.find(
      (order) =>
        String(order.userId) === String(currentUser?.id) &&
        String(order.courseId) === String(courseInfo?.id)
    );
    if (foundOrder) {
      toast.error("Bạn đã mua khóa học này rồi!!!");
      return;
    }

    const orderData = {
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      userName: currentUser?.username,
      courseId: courseInfo?.id,
      courseName: courseInfo?.name,
      courseThumbnail: courseInfo?.thumbnail,
      instructor: courseInfo?.instructor,
      totalPrice,
    };
    localStorage.setItem("order-data", JSON.stringify(orderData));
    if (voucher) localStorage.setItem("voucher", JSON.stringify(voucher));
    navigate("/order/checkout");
  };

  const handleAddCart = async () => {
    setLoading(true);

    const findCartItem = carts?.find(
      (cart) =>
        cart.courseId === courseInfo?.id && cart.userId === currentUser?.id
    );
    const isInOrder = orders?.find(
      (order) =>
        String(order.userId) === String(currentUser?.id) &&
        String(order.courseId) === String(courseInfo?.id)
    );

    if (isInOrder) {
      toast.error("Bạn đã mua khóa học này rồi!!!");
      setLoading(false);
      return;
    }

    if (findCartItem) {
      toast.info("Bạn đã thêm khóa học này vào giỏ hàng rồi!!!");
      setLoading(false);
      return;
    }

    const cartData = {
      userId: currentUser?.id,
      courseId: courseInfo?.id,
      totalPrice,
      courseName: courseInfo?.name,
      courseThumbnail: courseInfo?.thumbnail,
      instructor: courseInfo?.instructor,
      duration: courseInfo?.duration,
      totalLessons,
      totalReviews: courseInfo?.reviews || 0,
      rating: courseInfo?.rating || 5,
    };

    toast
      .promise(addToCart(cartData), {
        pending: "Đang thêm vào giỏ hàng...",
      })
      .then((res) => {
        toast.success("Thêm vào giỏ hàng thành công!!!");
        dispatch(
          addToCartRedux({
            id: res?.id,
            ...cartData,
          })
        );
        handleGetCarts();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Lỗi khi thêm vào giỏ hàng!!!");
      })
      .finally(() => setLoading(false));
  };

  const handleGetCarts = () => {
    setLoading(true);
    fetchCart()
      .then((res) => {
        setCarts(res || []);
        dispatch(updateCart(res));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Lỗi khi lấy danh sách giỏ hàng!!!");
      })
      .finally(() => setLoading(false));
  };

  const handleGetVouchers = () => {
    fetchVouchers()
      .then((res) => {
        setVoucherList(res || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  const handleGetOrders = () => {
    fetchOrders()
      .then((res) => {
        setOrders(res || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    handleGetCarts();
    handleGetVouchers();
    handleGetOrders();
  }, []);

  if (loading || loadingButton) return <Loading />;

  return (
    <div className="relative px-28 py-16 flex bg-[#f8fafc]">
      <div>
        <h3 className="text-[32px] font-semibold max-w-[70%] mb-3">
          {courseInfo?.name}
        </h3>
        <p className="max-w-[70%] text-[#555555] font-medium">
          {courseInfo?.description}
        </p>

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <div className="text-[20px] flex items-center gap-2">
              <p className="text-[#ffb400] text-[18px] font-medium mt-[1px]">
                {courseInfo?.star || 5}
              </p>
              <Star value={courseInfo?.star || 5} />
              <p className="text-[14px] mt-[1px]">
                {courseInfo?.reviews || 0} đánh giá
              </p>
            </div>

            <div className="mt-[1.5px] border-l-2 border-slate-500 pl-3">
              <p className="text-[#555555] text-[16px]">
                {courseInfo?.duration} giờ. {totalLessons} bài học. Tất cả trình
                độ
              </p>
            </div>
          </div>
        </div>

        <div className="py-[24px] flex items-center gap-3">
          <img
            src={Logo}
            className="w-[40px] h-[40px] rounded-full object-cover"
            alt=""
          />
          <p className="text-[#555555] font-medium">
            Giảng dạy bởi{" "}
            <span className="font-medium text-[#2563eb]">
              {courseInfo?.instructor}
            </span>
          </p>
        </div>
      </div>

      <div className="absolute right-8 rounded-[16px] max-w-[400px] max-h-[788px] z-1000 shadow-sm">
        <div className="p-[20px] pb-[32px]">
          <img
            src={courseInfo?.thumbnail}
            className="w-full h-[200px] object-cover rounded-[16px]"
            alt=""
          />
          <div className="flex items-center gap-2">
            <p
              className={`text-[24px] font-semibold pt-[28px] pb-[12px] ${
                courseInfo?.price !== totalPrice &&
                "line-through text-slate-400 font-normal"
              }`}
            >
              {formatVND(courseInfo?.price)}đ
            </p>
            {courseInfo?.price !== totalPrice && (
              <p className="text-[32px] font-semibold pt-[28px] pb-[12px]">
                {formatVND(totalPrice)}đ
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleAddCart}
              disabled={loading}
              title={loading ? <Spin size="small" /> : "Thêm vào giỏ hàng"}
              type="cart"
              style={`${loading ? "bg-opacity-50" : "bg-opacity-100"}`}
            />
            <Button
              onClick={handleNavigate}
              title="Mua ngay"
              type="secondary"
              style="py-3"
            />
          </div>

          <div className="flex items-center mt-5">
            <Input
              name="voucher"
              value={voucherCode}
              content="Nhập mã voucher"
              onChange={handleChangeVoucherCode}
              style="sm:w-full w-full md:text-[16px]! text-[14px]!
                 rounded-tr-none rounded-br-none outline-none"
            />
            <Button
              title={loadingButton ? <Spin size="small" /> : "Áp dụng"}
              disabled={loadingButton}
              onClick={handleVoucherCode}
              style="h-[50px] md:text-[16px]! text-[14px]! 
                text-center py-0! px-2! w-[40%] rounded-tl-none rounded-bl-none"
            />
          </div>

          {voucher && (
            <p className="text-[18px] font-medium mt-2">
              Bạn đã giảm được{" "}
              <span className="font-semibold">{formatVND(voucherValue)}đ</span>{" "}
              với voucher "{voucher.code}"
            </p>
          )}
        </div>

        <div className="p-[20px] border-t border-slate-300">
          <h3 className="text-[18px] font-semibold mt-3">Chia sẻ</h3>
          <img src={Social} className="mt-3" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CourseHeading;
