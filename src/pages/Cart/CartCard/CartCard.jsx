import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist, deleteCart } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import Star from "~/components/Star/Star";
import { removeCart } from "~/redux/cartSlice";
import { formatVND } from "~/utils/formatters";

const CartCard = ({ setCarts, cartItem }) => {
  const dispatch = useDispatch();

  const handleWishlist = () => {
    const wishListData = {
      ...cartItem,
    };

    toast
      .promise(addToWishlist(wishListData), {
        pending: "Đang thêm khóa học vào wishlist...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Thêm vào wishlist thành công!!!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Lỗi khi thêm khóa học vào wishlist!!!");
      });
  };

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
    <div
      className="w-full p-[16px] border border-[#e2e8f0] 
    rounded-[8px] flex flex-wrap justify-between gap-5"
    >
      <div className="flex max-sm:flex-wrap items-center gap-4">
        <img
          src={cartItem?.courseThumbnail}
          className="w-[192px] sm:h-full h-auto object-cover rounded-[4px]"
          alt=""
        />
        <div>
          <div className="flex flex-wrap justify-between gap-3 mb-2">
            <div>
              <h3 className="md:text-[18px] text-[16px] font-semibold max-w-md">
                {cartItem?.courseName}
              </h3>
              <p className="md:text-[16px] text-[14px] font-medium text-[#555555]">
                Giảng dạy bởi {cartItem?.instructor}
              </p>
            </div>
            <p className="md:text-[24px] text-[20px] font-semibold">
              {formatVND(cartItem?.totalPrice)}đ
            </p>
          </div>

          <div className="mb-1">
            <div className="flex items-center gap-3">
              <div className="text-[20px] flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <p
                    className="text-[#ffb400] md:text-[18px] 
                text-[16px] font-medium mt-[1px]"
                  >
                    {cartItem?.rating || 0}
                  </p>
                  <Star value={cartItem?.rating || 0} />
                </div>
                <p className="text-[14px] mt-[1px] text-[#64748b]">
                  ({cartItem?.totalReviews || 0} đánh giá)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleWishlist}
              title="Thêm vào wishlist"
              type="wishlist"
              style="py-1 px-0!"
            />
            <Button
              onClick={() => handleDeleteCart(cartItem?.id)}
              title="Xóa"
              type="warning"
              style="py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
