import ClockImg from "~/assets/images/clock.png";
import EducationImg from "~/assets/images/education.png";
import LessonsImg from "~/assets/images/lessons.png";
import RankImg from "~/assets/images/rank.png";
import Button from "~/components/Button/Button";

const CoursesCard = ({ course }) => {
  return (
    <div className="rounded-[20px] border-2 border-slate-200 flex gap-[8px]">
      <div className="relative basis-[calc(40%-16px)]">
        <img
          src={course?.thumbnail}
          className="w-full h-full object-cover rounded-tl-[20px] rounded-bl-[20px]"
          alt=""
        />
      </div>
      <div className="p-[16px] flex flex-col justify-between gap-3 basis-[calc(60%-16px)]">
        <div className="flex flex-col gap-3 mb-12">
          <p className="text-[16px] text-[#555555] font-medium">
            Giảng dạy bởi{" "}
            <span className="font-semibold text-black">
              {course?.instructor}
            </span>
          </p>
          <h3 className="text-[24px] font-semibold">{course?.courseName}</h3>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={ClockImg} alt="" />
              <span className="text-[16px] font-medium text-[#555555] mt-1">
                {course?.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={EducationImg} alt="" />
              <span className="text-[16px] font-medium text-[#555555] mt-1">
                {course?.students}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={RankImg} alt="" />
              <span className="text-[16px] font-medium text-[#555555] mt-1">
                Nâng cao
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img className="w-[16px] h-[16px]" src={LessonsImg} alt="" />
              <span className="text-[16px] font-medium text-[#555555] mt-1">
                20 bài học
              </span>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-slate-300 flex items-center justify-between gap-3 text-[18px]">
          <p className="text-[#9d9d9d] font-medium">{course?.price}đ</p>
          <Button title="Xem thêm" type="secondary" style="border-none" />
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
