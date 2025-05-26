import AwardImg from "~/assets/images/award.png";
import GraduationImg from "~/assets/images/graduation.png";
import PlayImg from "~/assets/images/play.png";
import useCourses from "~/hooks/useCourses";
import Logo from "/logo.jpg";

const CourseInstructor = ({ courseInfo, reviews = [], orders = [] }) => {
  const { courses } = useCourses();

  const studentCount = orders?.length
    ? [...new Set(orders.map((order) => order?.userName))]
    : [];

  return (
    <div className="py-[32px] border-b border-slate-300">
      <h3 className="md:text-[20px] text-[18px] font-semibold">Giảng viên</h3>

      <div className="mt-5">
        <h4 className="text-[#2563eb] font-semibold md:text-[24px] text-[20px]">
          {courseInfo?.instructor}
        </h4>
        <p className="md:text-[18px] text-[16px] text-[#555555]">
          {courseInfo?.instructorRole}
        </p>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <img
          src={Logo}
          className="w-[120px] h-[120px] object-cover rounded-full"
          alt=""
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src={AwardImg} className="w-[24px] h-[24px]" alt="" />
            <p className="md:text-[16px] text-[14px] text-[#555555] font-medium">
              {reviews?.length || 0} đánh giá
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src={GraduationImg} className="w-[24px] h-[24px]" alt="" />
            <p className="md:text-[16px] text-[14px] text-[#555555] font-medium">
              {studentCount?.length || 0} học sinh
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src={PlayImg} className="w-[24px] h-[24px]" alt="" />
            <p className="md:text-[16px] text-[14px] text-[#555555] font-medium">
              {courses?.length || 0} khóa học
            </p>
          </div>
        </div>
      </div>

      <p
        className="mt-6 text-[#555555] font-medium md:max-w-[75%] 
      sm:max-w-[85%] max-w-full"
      >
        {courseInfo?.instructorDescription}
      </p>
    </div>
  );
};

export default CourseInstructor;
