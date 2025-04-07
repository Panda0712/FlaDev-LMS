import Button from "~/components/Button/Button";
import Star from "~/components/Star/Star";

const CartCard = ({ cartItem }) => {
  return (
    <div className="w-full p-[16px] border border-[#e2e8f0] rounded-[8px] flex justify-between gap-5">
      <div className="flex items-center gap-4">
        <img
          src={cartItem?.thumbnail}
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
                  4.6
                </p>
                <Star value={4.6} />
                <p className="text-[14px] mt-[1px] text-[#64748b]">
                  (651 đánh giá)
                </p>
              </div>

              <div className="mt-[1.5px] border-l-2 border-slate-500 pl-3">
                <p className="text-[#555555] text-[16px] font-medium">
                  22 Total Hours. 155 Lectures. All levels
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button title="Thêm vào wishlist" type="wishlist" style="py-1" />
            <Button title="Xóa" type="warning" style="py-1" />
          </div>
        </div>
      </div>
      <p className="text-[24px] font-semibold">{cartItem?.price}đ</p>
    </div>
  );
};

export default CartCard;
