import { isArray } from "lodash";
import { formatVND } from "~/utils/formatters";

const CheckoutDetails = ({ courseInfo }) => {
  return (
    <div className="p-[16px] rounded-[8px] border-1 flex flex-col gap-4 border-slate-300">
      {isArray(courseInfo) ? (
        <>
          {courseInfo.map((course) => (
            <div key={course?.id} className="pb-40">
              <img
                src={course?.courseThumbnail}
                className="w-full max-md:h-auto h-full object-cover rounded-[8px]"
                alt=""
              />
              <div>
                <h4 className="md:text-[24px] text-[20px] font-semibold line-clamp-2">
                  {course?.courseName}
                </h4>
                <p className="md:text-[18px] text-[16px] text-[#555555] font-medium">
                  Giảng dạy bởi {course?.instructor}
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="md:text-[28px] text-[24px] font-semibold">
                    {formatVND(course?.totalPrice)}đ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <img
            src={courseInfo?.courseThumbnail}
            className="w-full max-md:h-auto h-full object-cover rounded-[8px]"
            alt=""
          />
          <div>
            <h4 className="md:text-[24px] text-[20px] font-semibold line-clamp-2">
              {courseInfo?.courseName}
            </h4>
            <p className="md:text-[18px] text-[16px] text-[#555555] font-medium">
              Giảng dạy bởi {courseInfo?.instructor}
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <span className="md:text-[28px] text-[24px] font-semibold">
                {formatVND(courseInfo?.totalPrice)}đ
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutDetails;
