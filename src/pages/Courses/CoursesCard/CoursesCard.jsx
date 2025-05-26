import { useNavigate } from "react-router-dom";
import ClockImg from "~/assets/images/clock.png";
import EducationImg from "~/assets/images/education.png";
import LessonsImg from "~/assets/images/lessons.png";
import RankImg from "~/assets/images/rank.png";
import Button from "~/components/Button/Button";
import { formatVND } from "~/utils/formatters";

const CoursesCard = ({ course }) => {
  const totalLessons = course?.courseModules?.reduce(
    (acc, module) => acc + module?.lessons?.length,
    0
  );
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/courses/${course?.id}`)}
      className="rounded-[20px] border-2 border-slate-200 
      flex max-md:flex-col gap-[8px] 
      cursor-pointer transform transition hover:translate-y-[-5px]"
    >
      <div className="relative basis-[calc(40%-16px)]">
        <img
          src={course?.thumbnail}
          className="w-full max-md:h-[200px] h-full object-cover 
           md:rounded-tl-[20px] md:rounded-bl-[20px] rounded-t-[20px]"
          alt=""
        />
      </div>
      <div className="p-[16px] flex flex-col justify-between gap-3 basis-[calc(60%-16px)]">
        <div className="flex flex-col gap-3 md:mb-12 mb-4">
          <p className="md:text-[16px] text-[14px] text-[#555555] font-medium">
            Giảng dạy bởi{" "}
            <span className="font-semibold text-black">
              {course?.instructor}
            </span>
          </p>
          <h3 className="md:text-[24px] text-[20px] font-semibold line-clamp-3">
            {course?.name}
          </h3>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={ClockImg} alt="" />
              <span className="md:text-[16px] text-[14px] font-medium text-[#555555] mt-1">
                {course?.duration} giờ
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={EducationImg} alt="" />
              <span className="md:text-[16px] text-[14px] font-medium text-[#555555] mt-1">
                {course?.students || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={RankImg} alt="" />
              <span className="md:text-[16px] text-[14px] font-medium text-[#555555] mt-1">
                Nâng cao
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={LessonsImg} alt="" />
              <span className="md:text-[16px] text-[14px] font-medium text-[#555555] mt-1">
                {totalLessons} bài học
              </span>
            </div>
          </div>
        </div>

        <div
          className="py-4 border-t border-slate-300 flex flex-wrap 
        items-center justify-between gap-1 text-[18px]"
        >
          <p className="text-[#9d9d9d] font-medium">
            {formatVND(course?.price)}đ
          </p>
          <Button title="Xem thêm" type="secondary" style="border-none" />
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
