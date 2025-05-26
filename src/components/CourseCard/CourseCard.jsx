import { Link, useNavigate } from "react-router-dom";
import ClockImg from "~/assets/images/clock.png";
import EducationImg from "~/assets/images/education.png";
import Star from "~/components/Star/Star";
import { formatVND } from "~/utils/formatters";

const CourseCard = ({
  reviewsListCourses = [],
  course,
  type = "primary",
  learning,
}) => {
  const navigate = useNavigate();

  const courseRating =
    (reviewsListCourses?.length > 0 &&
      reviewsListCourses.find(
        (review) =>
          review.courseId === course?.id || review.courseId === course?.courseId
      )) ||
    null;
  const countRating = reviewsListCourses?.filter(
    (review) =>
      review.courseId === course?.id || review.courseId === course?.courseId
  )?.length;

  if (type === "secondary") {
    return (
      <div
        className="relative p-[16px] rounded-[16px] shadow-md 
        cursor-pointer transition transform hover:translate-y-[-4px]"
        onClick={() =>
          navigate(
            learning
              ? `/courses/${course?.courseId}/learning`
              : `/courses/${course?.id}`
          )
        }
      >
        <img
          src={course?.thumbnail || course?.courseThumbnail}
          className="w-full lg:h-[145px] md:h-[125px] sm:h-[115px] 
          h-[100px] object-cover rounded-[8px]"
          alt=""
        />
        <h3
          className="md:text-[18px] sm:text-[16px] text-[14px] 
        font-semibold mt-4 line-clamp-2"
        >
          {course?.name || course?.courseName}
        </h3>
        <p
          className="md:text-[16px] sm:text-[14px] text-[12px] 
        text-[#555555] font-medium my-3"
        >
          Giảng dạy bởi {course?.instructor}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Star value={courseRating?.averageRating || 0} />
          <span>{countRating || 0} đánh giá</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() =>
        navigate(
          learning
            ? `/courses/${course?.courseId}/learning`
            : `/courses/${course?.id}`
        )
      }
      className="rounded-[20px] cursor-pointer transform transition 
      hover:translate-y-[-20px] hover:shadow-xl hover:border-0"
    >
      <img
        src={course?.thumbnail}
        className="w-full lg:min-h-[250px] md:min-h-[200px] max-md:max-h-[200px]
         object-cover rounded-tl-[20px] rounded-tr-[20px]"
        alt=""
      />
      <div className="p-[16px] border-x-2 border-slate-300 border-b-2 rounded-bl-[20px] rounded-br-[20px]">
        <p className="text-[#555555] md:text-[16px] text-[14px] mb-[12px]">
          Giảng viên:{" "}
          <span className="font-medium text-black">{course?.instructor}</span>
        </p>
        <h4
          className="font-semibold lg:text-[24px] md:text-[20px] 
        sm:text-[18px] text-[16px] line-clamp-2"
        >
          {course?.name}
        </h4>
        <div className="flex items-center gap-4 mt-[16px] border-b-2 border-slate-200 pb-[16px]">
          <div className="flex items-center gap-2">
            <img src={ClockImg} className="w-[16px] h-[16px]" alt="" />
            <span className="text-[#555555] md:text-[16px] text-[14px] font-medium">
              {course?.duration} giờ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src={EducationImg} className="w-[16px] h-[16px]" alt="" />
            <span className="text-[#555555] md:text-[16px] text-[14px] font-medium">
              {course?.students || 0}
            </span>
          </div>
        </div>

        <div className="flex max-sm:flex-wrap items-center justify-between py-[16px]">
          <p className="md:text-[18px] text-[16px] text-[#9d9d9d] font-medium">
            {formatVND(course?.price)}đ
          </p>
          <Link to="/courses">
            <span className="font-semibold md:text-[18px] text-[16px]">
              Xem thêm
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
