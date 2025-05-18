import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteCart } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import Star from "~/components/Star/Star";
import { removeCart } from "~/redux/cartSlice";
import { formatVND } from "~/utils/formatters";

const CartCard = ({ setCarts, cartItem }) => {
  const dispatch = useDispatch();

  const handleDeleteCart = (id) => {
    toast
      .promise(deleteCart(id), {
        pending: "Đang xóa khóa học khỏi giỏ hàng...",
      })
      .then(() => {
        toast.success("Xóa khỏi giỏ hàng thành công!!!");
        dispatch(removeCart(id));
        setCarts((carts) => carts.filter((cart) => cart.id !== id));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Lỗi khi xóa khỏi giỏ hàng!!!");
      });
  };

  return (
    <div className="w-full p-[16px] border border-[#e2e8f0] rounded-[8px] flex justify-between gap-5">
      <div className="flex items-center gap-4">
        <img
          src={cartItem?.courseThumbnail}
          className="w-[192px] h-full object-cover rounded-[4px]"
          alt=""
        />
        <div>
          <h3 className="text-[18px] font-semibold max-w-md">
            {cartItem?.courseName}
          </h3>
          <p className="text-[16px] font-medium text-[#555555]">
            Giảng dạy bởi {cartItem?.instructor}
          </p>

          <div className="mb-1">
            <div className="flex items-center gap-3">
              <div className="text-[20px] flex items-center gap-2">
                <p className="text-[#ffb400] text-[18px] font-medium mt-[1px]">
                  {cartItem?.rating || 5}
                </p>
                <Star value={4.6} />
                <p className="text-[14px] mt-[1px] text-[#64748b]">
                  ({cartItem?.reviews || 0} đánh giá)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button title="Thêm vào wishlist" type="wishlist" style="py-1" />
            <Button
              onClick={() => handleDeleteCart(cartItem?.id)}
              title="Xóa"
              type="warning"
              style="py-1"
            />
          </div>
        </div>
      </div>
      <p className="text-[24px] font-semibold">
        {formatVND(cartItem?.totalPrice)}đ
      </p>
    </div>
  );
};

export default CartCard;
