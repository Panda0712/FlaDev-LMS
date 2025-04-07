import { Link } from "react-router-dom";
import ClockImg from "~/assets/images/clock.png";
import EducationImg from "~/assets/images/education.png";
import Star from "~/components/Star/Star";

const CourseCard = ({ course, type = "primary" }) => {
  if (type === "secondary") {
    return (
      <div className="relative p-[16px] rounded-[16px] shadow-md">
        <img
          src={course?.thumbnail}
          className="w-full h-[145px] object-cover rounded-[8px]"
          alt=""
        />
        <h3 className="text-[18px] font-semibold mt-4">{course?.courseName}</h3>
        <p className="text-[16px] text-[#555555] font-medium my-3">
          Giảng dạy bởi {course?.instructor}
        </p>
        <div className="flex items-center gap-3">
          <Star value={5} />
          <span>(400 đánh giá)</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] cursor-pointer transform transition hover:translate-y-[-20px] hover:shadow-xl hover:border-0">
      <img
        src={course?.thumbnail}
        className="w-full min-h-[250px] object-cover rounded-tl-[20px] rounded-tr-[20px]"
        alt=""
      />
      <div className="p-[16px] border-x-2 border-slate-300 border-b-2 rounded-bl-[20px] rounded-br-[20px]">
        <p className="text-[#555555] text-[16px] mb-[12px]">
          Giảng viên:{" "}
          <span className="font-medium text-black">{course?.instructor}</span>
        </p>
        <h4 className="font-semibold text-[24px]">{course?.courseName}</h4>
        <div className="flex items-center gap-4 mt-[16px] border-b-2 border-slate-200 pb-[16px]">
          <div className="flex items-center gap-2">
            <img src={ClockImg} className="w-[16px] h-[16px]" alt="" />
            <span className="text-[#555555] text-[16px] font-medium">
              {course?.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={EducationImg} className="w-[16px] h-[16px]" alt="" />
            <span className="text-[#555555] text-[16px] font-medium">
              {course?.students}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-[16px]">
          <p className="text-[18px] text-[#9d9d9d] font-medium">
            {course?.price}đ
          </p>
          <Link to="/courses">
            <span className="font-semibold text-[18px]">Xem thêm</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
