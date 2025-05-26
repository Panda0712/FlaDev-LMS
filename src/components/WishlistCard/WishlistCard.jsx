import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteWishlist } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import Star from "~/components/Star/Star";

const WishlistCard = ({ wishlistItem, handleAfterDelete }) => {
  const navigate = useNavigate();

  const handleDeleteWishlist = (id) => {
    toast
      .promise(deleteWishlist(id), {
        pending: "Đang xóa khóa học khỏi wishlist...",
      })
      .then(() => {
        toast.success("Xóa khỏi wishlist thành công!!!");
        handleAfterDelete();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Lỗi khi xóa khỏi wishlist!!!");
      });
  };

  return (
    <div className="w-full p-[16px] border border-[#e2e8f0] rounded-[8px] flex justify-between gap-5">
      <div className="flex max-sm:flex-wrap items-center gap-4">
        <img
          src={wishlistItem?.courseThumbnail}
          className="w-[192px] h-full max-sm:h-auto object-cover rounded-[4px]"
          alt=""
        />
        <div>
          <h3 className="text-[18px] font-semibold max-w-md">
            {wishlistItem?.courseName}
          </h3>
          <p className="text-[16px] font-medium text-[#555555]">
            Giảng dạy bởi {wishlistItem?.instructor}
          </p>

          <div className="mb-1">
            <div className="flex items-center gap-3">
              <div className="text-[20px] flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-[#ffb400] text-[18px] font-medium mt-[1px]">
                    {wishlistItem?.rating || 0}
                  </p>
                  <Star value={wishlistItem?.rating || 0} />
                </div>
                <p className="text-[14px] mt-[1px] text-[#64748b]">
                  ({wishlistItem?.totalReviews || 0} đánh giá)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => navigate(`/courses/${wishlistItem?.courseId}`)}
              title="Xem thêm"
              type="wishlist"
              style="py-1 px-0!"
            />
            <Button
              onClick={() => handleDeleteWishlist(wishlistItem?.id)}
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

export default WishlistCard;
