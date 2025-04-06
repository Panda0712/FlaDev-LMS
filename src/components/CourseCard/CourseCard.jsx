// {
//     thumbnail:
//       "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZdgcqM3lVd1LrdxnV-0NAsHPJO3hGXhTIIvWDenmqOJJ5Y80A1z_x8tSqcim-ht-21Oum43KXU0QgEGFelh9jZOpJpHwhRvwaJW7Jt5t0yMvGeqlEbcGkYYu7W17gS8XdXr8yjH-U0mOCd3BMOTKncpI9B8i0ZB83gJhzq0spVVqqgtVTmhd71jau/s320-rw/4406786_4821_2.jpg",
//     instructor: "John Smilga",
//     courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
//     duration: "20.5 hours",
//     students: 19387,
//     price: 1949000,
//     discount: 0,
//   },
import { Link } from "react-router-dom";
import ClockImg from "~/assets/images/clock.png";
import EducationImg from "~/assets/images/education.png";

const CourseCard = ({ course }) => {
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
