import { isArray } from "lodash";
import { formatVND } from "~/utils/formatters";

const CheckoutPrice = ({ courseInfo }) => {
  const mediumTextStyle = "md:text-[18px] text-[16px] font-semibold";
  const greyTextStyle = "md:text-[18px] text-[16px] text-[#555555] font-medium";
  const largeTextStyle = "md:text-[22px] text-[20px] font-semibold";

  const totalPrice = isArray(courseInfo)
    ? courseInfo.reduce((acc, course) => acc + course.totalPrice, 0)
    : courseInfo?.totalPrice;

  return (
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
  );
};

export default CheckoutPrice;
