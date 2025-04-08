const CheckoutDetails = ({ courseInfo }) => {
  return (
    <div className="p-[16px] rounded-[8px] border-1 flex gap-4 border-slate-300">
      <img
        src={courseInfo?.thumbnail}
        className="w-[140px] h-full object-cover rounded-[8px]"
        alt=""
      />
      <div>
        <h4 className="text-[24px] font-semibold">
          {courseInfo?.courseName?.length > 30
            ? courseInfo.courseName.slice(0, 30) + "..."
            : courseInfo.courseName}
        </h4>
        <p className="text-[18px] text-[#555555] font-medium">
          Giảng dạy bởi {courseInfo?.instructor}
        </p>
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-[16px] font-medium text-[#334155]">
            155 Lectures . 22 Total Hours
          </span>
          <span className="text-[28px] font-semibold">
            {courseInfo?.price}đ
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
