import Social from "~/assets/images/social.png";
import Button from "~/components/Button/Button";
import Star from "~/components/Star/Star";
import Logo from "/logo.jpg";
import { formatVND } from "~/utils/formatters";

const CourseHeading = ({ courseInfo }) => {
  const totalLessons = courseInfo?.courseModules?.reduce(
    (acc, module) => acc + module?.lessons?.length,
    0
  );

  return (
    <div className="relative px-28 py-16 flex bg-[#f8fafc]">
      <div>
        <h3 className="text-[32px] font-semibold max-w-[70%] mb-3">
          {courseInfo?.name}
        </h3>
        <p className="max-w-[70%] text-[#555555] font-medium">
          {courseInfo?.description}
        </p>

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <div className="text-[20px] flex items-center gap-2">
              <p className="text-[#ffb400] text-[18px] font-medium mt-[1px]">
                {courseInfo?.star || 5}
              </p>
              <Star value={courseInfo?.star || 5} />
              <p className="text-[14px] mt-[1px]">
                {courseInfo?.reviews || 0} đánh giá
              </p>
            </div>

            <div className="mt-[1.5px] border-l-2 border-slate-500 pl-3">
              <p className="text-[#555555] text-[16px]">
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

      <div className="absolute right-8 rounded-[16px] max-w-[400px] max-h-[588px] shadow-sm">
        <div className="p-[20px] pb-[32px]">
          <img
            src={courseInfo?.thumbnail}
            className="w-full h-[200px] object-cover rounded-[16px]"
            alt=""
          />
          <p className="text-[24px] font-semibold pt-[28px] pb-[12px]">
            {formatVND(courseInfo?.price)}đ
          </p>

          <div className="flex flex-col gap-4">
            <Button title="Thêm vào giỏ hàng" type="cart" />
            <Button title="Mua ngay" type="secondary" style="py-3" />
          </div>
        </div>

        <div className="p-[20px] border-t border-slate-300">
          <h3 className="text-[18px] font-semibold mt-3">Chia sẻ</h3>
          <img src={Social} className="mt-3" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CourseHeading;
