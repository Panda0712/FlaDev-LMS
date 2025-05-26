import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "~/components/Button/Button";
import { formatVND } from "~/utils/formatters";

const CartDetails = ({ carts, orders }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const checkOrder = (cartItem) =>
    orders.find(
      (order) =>
        order.userId === cartItem.userId && order.courseId === cartItem.courseId
    );

  const handleNavigate = () => {
    if (!carts.length) {
      toast.error("Vui lòng chọn khóa học trước khi mua!!");
      return;
    }

    let isInOrder = null;
    carts.forEach((cart) => {
      if (checkOrder(cart)) isInOrder = { ...cart };
    });

    if (isInOrder) {
      toast.error(`Khóa ${isInOrder.courseName} đã được mua rồi!!!`);
      return;
    }
    let orderData = null;
    if (carts.length < 2) {
      orderData = {
        userId: carts[0]?.userId,
        userEmail: carts[0]?.userEmail || currentUser?.email,
        userName: currentUser?.username || currentUser?.username,
        courseId: carts[0]?.courseId,
        courseName: carts[0]?.courseName,
        courseThumbnail: carts[0]?.courseThumbnail,
        instructor: carts[0]?.instructor,
        totalPrice,
      };
      localStorage.setItem("order-data", JSON.stringify(orderData));
    } else {
      const orderMapData = carts.map((cart) => ({
        userId: cart?.userId,
        userEmail: cart?.userEmail || currentUser?.email,
        userName: currentUser?.username || currentUser?.username,
        courseId: cart?.courseId,
        courseName: cart?.courseName,
        courseThumbnail: cart?.courseThumbnail,
        instructor: cart?.instructor,
        totalPrice: cart?.totalPrice,
      }));
      orderData = [...orderMapData];
      localStorage.setItem("order-data", JSON.stringify(orderData));
    }
    localStorage.setItem("is-cart", JSON.stringify(true));
    navigate("/order/checkout");
  };

  const mediumTextStyle = "md:text-[18px] text-[16px] font-semibold";
  const greyTextStyle = "md:text-[18px] text-[16px] text-[#555555] font-medium";
  const largeTextStyle =
    "lg:text-[22px] md:text-[20px] text-[18px] font-semibold";

  const totalPrice = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);

  return (
    <div
      className="relative flex flex-col gap-4 basis-[calc(25%-24px)] 
    max-md:basis-[70%] max-sm:basis-[100%]"
    >
      <div className="flex flex-col gap-3 w-full">
        <h4 className="lg:text-[24px] md:text-[22px] text-[20px] font-semibold">
          Chi tiết đơn hàng
        </h4>
        <div className="bg-[#f8fafc] border-2 border-slate-200 rounded-[8px] p-[16px] w-full">
          <div className="flex items-center justify-between gap-4">
            <span className={greyTextStyle}>Giá</span>
            <span className={mediumTextStyle}>{formatVND(totalPrice)}đ</span>
          </div>
          <div className="w-full h-[2px] bg-slate-200 my-[16px]" />
          <div className="flex items-center justify-between gap-4">
            <span className={largeTextStyle}>Tổng</span>
            <span className={largeTextStyle}>{formatVND(totalPrice)}đ</span>
          </div>
        </div>
      </div>
      <Button
        onClick={handleNavigate}
        title="Tiếp tục mua hàng"
        type="cart"
        style="mt-2"
      />
    </div>
  );
};

export default CartDetails;
