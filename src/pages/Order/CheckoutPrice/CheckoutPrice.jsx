const CheckoutPrice = () => {
  const mediumTextStyle = "text-[18px] font-semibold";
  const greyTextStyle = "text-[18px] text-[#555555] font-medium";
  const largeTextStyle = "text-[22px] font-semibold";

  return (
    <div className="bg-[#f8fafc] border-2 border-slate-200 rounded-[8px] p-[16px] w-full">
      <div className="flex items-center justify-between gap-4">
        <span className={greyTextStyle}>Giá</span>
        <span className={mediumTextStyle}>300.000đ</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className={greyTextStyle}>Khuyến mãi</span>
        <span className={mediumTextStyle}>-100.000đ</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className={greyTextStyle}>Thuế</span>
        <span className={mediumTextStyle}>20.000đ</span>
      </div>
      <div className="w-full h-[2px] bg-slate-200 my-[16px]" />
      <div className="flex items-center justify-between gap-4">
        <span className={largeTextStyle}>Tổng</span>
        <span className={largeTextStyle}>220.000đ</span>
      </div>
    </div>
  );
};

export default CheckoutPrice;
