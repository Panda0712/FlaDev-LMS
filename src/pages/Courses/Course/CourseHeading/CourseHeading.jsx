/* eslint-disable react-hooks/exhaustive-deps */
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { toast } from "react-toastify";
import {
  addToCart,
  fetchCart,
  fetchOrders,
  fetchVouchers,
} from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Loading from "~/components/Loading/Loading";
import Star from "~/components/Star/Star";
import { addToCart as addToCartRedux, updateCart } from "~/redux/cartSlice";
import { formatVND } from "~/utils/formatters";
import Logo from "/logo.jpg";

const CourseHeading = ({ reviews, courseInfo }) => {
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [carts, setCarts] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [orders, setOrders] = useState([]);

  const totalRating =
    reviewsList.reduce((acc, review) => acc + review.rating, 0) || 0;
  const averageRating = Math.floor(totalRating / reviewsList?.length || 0);

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

  const shareUrl = `https://fla-dev-lms.vercel.app/courses/${courseInfo?.id}`;
  const shareTitle = `${courseInfo?.name}`;

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
      totalReviews: reviewsList?.length || 0,
      rating: averageRating || 0,
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

  useEffect(() => {
    const courseReviews =
      reviews?.filter((review) => review?.courseId === courseInfo?.id) || [];

    if (courseReviews?.length) {
      setReviewsList(courseReviews);
    }
  }, [courseInfo?.id, reviews]);

  if (loading || loadingButton) return <Loading />;

  return (
    <div
      className="relative lg:px-28 md:px-24 sm:px-18 px-12 
    py-16 flex max-[1280px]:flex-col gap-5 bg-[#f8fafc]"
    >
      <div>
        <h3
          className="lg:text-[32px] md:text-[28px] text-[24px] 
        font-semibold lg:max-w-[70%] max-w-full mb-3"
        >
          {courseInfo?.name}
        </h3>
        <p className="lg:max-w-[70%] md:max-w-[80%] max-w-full text-[#555555] font-medium">
          {courseInfo?.description}
        </p>

        <div className="mt-4">
          <div className="flex max-sm:flex-wrap items-center gap-3">
            <div className="md:text-[20px] text-[18px] flex items-center gap-2">
              <p className="text-[#ffb400] md:text-[18px] text-[16px] font-medium mt-[1px]">
                {averageRating || 0}
              </p>
              <Star value={averageRating || 0} />
              <p className="md:text-[14px] text-[12px] mt-[1px]">
                {reviewsList?.length || 0} đánh giá
              </p>
            </div>

            <div className="mt-[1.5px] border-l-2 border-slate-500 pl-3">
              <p className="text-[#555555] md:text-[16px] text-[14px]">
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

      <div
        className="max-[1280px]:relative absolute max-[1280px]:right-0 right-8 rounded-[16px] max-[1280px]:max-w-[50%] 
        max-lg:max-w-[70%] max-md:max-w-[80%] max-sm:max-w-full 
      max-w-[400px] max-h-[788px] bg-white z-1000 shadow-sm"
      >
        <div className="p-[20px] pb-[32px]">
          <img
            src={courseInfo?.thumbnail}
            className="w-full h-[200px] object-cover rounded-[16px]"
            alt=""
          />
          <div className="flex items-center gap-2">
            <p
              className={`md:text-[24px] text-[20px] font-semibold pt-[28px] pb-[12px] ${
                courseInfo?.price !== totalPrice &&
                "line-through text-slate-400 font-normal"
              }`}
            >
              {formatVND(courseInfo?.price)}đ
            </p>
            {courseInfo?.price !== totalPrice && (
              <p
                className="lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px]
               font-semibold pt-[28px] pb-[12px]"
              >
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
            <p className="md:text-[18px] text-[16px] font-medium mt-2">
              Bạn đã giảm được{" "}
              <span className="font-semibold">{formatVND(voucherValue)}đ</span>{" "}
              với voucher "{voucher.code}"
            </p>
          )}
        </div>

        <div className="p-[20px] border-t border-slate-300">
          <h3 className="md:text-[18px] text-[16px] font-semibold mt-3">
            Chia sẻ
          </h3>
          <div className="flex max-sm:flex-wrap items-start gap-4 mt-5">
            <div className="Demo__some-network">
              <FacebookShareButton
                url={shareUrl}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <div>
                <FacebookShareCount
                  url={shareUrl}
                  className="Demo__some-network__share-count"
                >
                  {(count) => count}
                </FacebookShareCount>
              </div>
            </div>

            <div className="Demo__some-network">
              <FacebookMessengerShareButton
                url={shareUrl}
                appId="521270401588372"
                className="Demo__some-network__share-button"
              >
                <FacebookMessengerIcon size={40} round />
              </FacebookMessengerShareButton>
            </div>

            <div className="Demo__some-network">
              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                className="Demo__some-network__share-button"
              >
                <XIcon size={40} round />
              </TwitterShareButton>
            </div>

            <div className="Demo__some-network">
              <TelegramShareButton
                url={shareUrl}
                title={shareTitle}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={40} round />
              </TelegramShareButton>
            </div>

            <div className="Demo__some-network">
              <LinkedinShareButton
                url={shareUrl}
                className="Demo__some-network__share-button"
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeading;
