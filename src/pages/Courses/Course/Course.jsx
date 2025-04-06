import StarRatingComponent from "react-star-rating-component";
import NavigationText from "~/components/NavigationText/NavigationText";
import ExampleAvatar from "~/assets/images/example-avatar.png";
import Button from "~/components/Button/Button";
import Social from "~/assets/images/social.png";
import GraduationImg from "~/assets/images/graduation.png";
import PlayImg from "~/assets/images/play.png";
import AwardImg from "~/assets/images/award.png";
import { ChevronDown } from "lucide-react";

const courseInfo = {
  thumbnail:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZdgcqM3lVd1LrdxnV-0NAsHPJO3hGXhTIIvWDenmqOJJ5Y80A1z_x8tSqcim-ht-21Oum43KXU0QgEGFelh9jZOpJpHwhRvwaJW7Jt5t0yMvGeqlEbcGkYYu7W17gS8XdXr8yjH-U0mOCd3BMOTKncpI9B8i0ZB83gJhzq0spVVqqgtVTmhd71jau/s320-rw/4406786_4821_2.jpg",
  instructor: "John Smilga",
  instructorRole: "Software Engineer",
  instructorDescription:
    "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
  courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
  description:
    "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
  duration: "20.5 hours",
  students: 19387,
  price: 1949000,
  discount: 0,
  courseModule: [
    { title: "Introduction to UX Design", lessons: 5, duration: "1 hour" },
    { title: "Basics of User-Centered Design", lessons: 5, duration: "1 hour" },
    { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
    { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
  ],
};

const Course = () => {
  return (
    <section>
      <NavigationText placeTo="MERN Stack" />
      <div className="relative px-28 py-16 flex bg-[#f8fafc]">
        <div>
          <h3 className="text-[32px] font-semibold max-w-[70%] mb-3">
            {courseInfo?.courseName}
          </h3>
          <p className="max-w-[70%] text-[#555555] font-medium">
            {courseInfo?.description}
          </p>

          <div className="mt-4">
            <div className="flex items-center gap-3">
              <div className="text-[20px] flex items-center gap-2">
                <p className="text-[#ffb400] text-[18px] font-medium mt-[1px]">
                  4.6
                </p>
                <StarRatingComponent
                  name="course-rating"
                  value={4.6}
                  starCount={5}
                  editing={false}
                />
                <p className="text-[14px] mt-[1px]">(651 đánh giá)</p>
              </div>

              <div className="mt-[1.5px] border-l-2 border-slate-500 pl-3">
                <p className="text-[#555555] text-[16px]">
                  22 Total Hours. 155 Lectures. All levels
                </p>
              </div>
            </div>
          </div>

          <div className="py-[24px] flex items-center gap-3">
            <img
              src={ExampleAvatar}
              className="w-[40px] h-[40px] object-cover"
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
              {courseInfo?.price}đ
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

      <div className="px-28">
        <div className="flex items-center gap-[24px] pt-[40px] pb-[24px] border-b border-slate-300 max-w-3xl">
          <div className="flex items-center justify-center w-[148px] h-[57px] rounded-[8px] bg-[#eff6ff] cursor-pointer transition hover:opacity-80">
            <span className="text-[14px] text-[#555555] font-medium">
              Nội dung
            </span>
          </div>
          <div className="flex items-center justify-center w-[148px] h-[57px] rounded-[8px] bg-[#eff6ff] cursor-pointer transition hover:opacity-80">
            <span className="text-[14px] text-[#555555] font-medium">
              Giảng viên
            </span>
          </div>
          <div className="flex items-center justify-center w-[148px] h-[57px] rounded-[8px] bg-[#eff6ff] cursor-pointer transition hover:opacity-80">
            <span className="text-[14px] text-[#555555] font-medium">
              Chương trình
            </span>
          </div>
          <div className="flex items-center justify-center w-[148px] h-[57px] rounded-[8px] bg-[#eff6ff] cursor-pointer transition hover:opacity-80">
            <span className="text-[14px] text-[#555555] font-medium">
              Đánh giá
            </span>
          </div>
        </div>

        <div className="py-[16px] border-b border-slate-300">
          <div className="flex flex-col gap-2 py-4">
            <h3 className="text-[20px] font-semibold">Nội dung khóa học</h3>
            <p className="max-w-[50%] text-[16px] font-medium text-[#555555]">
              {courseInfo?.description}
            </p>
          </div>
        </div>

        <div className="py-[32px] border-b border-slate-300">
          <h3 className="text-[20px] font-semibold">Giảng viên</h3>

          <div className="mt-5">
            <h4 className="text-[#2563eb] font-semibold text-[24px]">
              {courseInfo?.instructor}
            </h4>
            <p className="text-[18px] text-[#555555]">
              {courseInfo?.instructorRole}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-5">
            <img
              src={ExampleAvatar}
              className="w-[120px] h-[120px] object-cover rounded-full"
              alt=""
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src={AwardImg} className="w-[24px] h-[24px]" alt="" />
                <p className="text-[16px] text-[#555555] font-medium">
                  40,445 đánh giá
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img src={GraduationImg} className="w-[24px] h-[24px]" alt="" />
                <p className="text-[16px] text-[#555555] font-medium">
                  500 học sinh
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img src={PlayImg} className="w-[24px] h-[24px]" alt="" />
                <p className="text-[16px] text-[#555555] font-medium">
                  15 khóa học
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[#555555] font-medium max-w-[75%]">
            {courseInfo?.instructorDescription}
          </p>
        </div>

        <div className="py-[32px]">
          <h3 className="text-[20px] font-semibold">Chương trình</h3>

          <div className="flex flex-col mt-5 pb-8">
            {courseInfo?.courseModule?.map((item, index) => (
              <div
                key={index}
                className="p-[24px] rounded-md flex items-center justify-between border border-slate-300"
              >
                <div className="flex items-center gap-4">
                  <ChevronDown />
                  <p className="font-semibold text-[18px]">{item?.title}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium text-[#555555]">
                    {item?.lessons} bài học
                  </p>
                  <p className="font-medium text-[#555555]">
                    {item?.duration} giờ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;
