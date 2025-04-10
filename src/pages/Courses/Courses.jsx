// import { useState } from "react";
import { Search } from "lucide-react";
import ExampleAvatar from "~/assets/images/example-avatar-2.png";
import ClockImg from "~/assets/images/clock.png";
import EducationImg from "~/assets/images/education.png";
import RankImg from "~/assets/images/rank.png";
import LessonsImg from "~/assets/images/lessons.png";
import Input from "~/components/Input/Input";
import NavigationText from "~/components/NavigationText/NavigationText";
import {
  categoryList,
  levelList,
  priceList,
  reviewList,
  teacherList,
} from "~/pages/Courses/constants";
import CourseFilter from "~/pages/Courses/CourseFilter/CourseFilter";
import Button from "~/components/Button/Button";

// const filters = {
//   categoryList,
//   levelList,
//   priceList,
//   reviewList,
//   teacherList,
// };

const listCourses = [
  {
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiD4MDkb86X8t9nq-LrEMp3r-bHdx3_D2LUELSBNKYmbmvZbcrQ4TXMM3MRJxriNRWkFGYxtZfdIk_kKDy3QLtEkCVN5REHToYQeoxfsr47YNhNI865r9-7OgYMcI2jPvGWDlD927NKZoI8FyZrOK1YMloHST4NHaL_d8MIox8T5VK2rIbbKh37sHotYmU/s320-rw/3959106_03de_6.jpg",
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
      {
        title: "Basics of User-Centered Design",
        lessons: 5,
        duration: "1 hour",
      },
      { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
      { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
    ],
    reviews: [
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
    ],
  },
  {
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiD4MDkb86X8t9nq-LrEMp3r-bHdx3_D2LUELSBNKYmbmvZbcrQ4TXMM3MRJxriNRWkFGYxtZfdIk_kKDy3QLtEkCVN5REHToYQeoxfsr47YNhNI865r9-7OgYMcI2jPvGWDlD927NKZoI8FyZrOK1YMloHST4NHaL_d8MIox8T5VK2rIbbKh37sHotYmU/s320-rw/3959106_03de_6.jpg",
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
      {
        title: "Basics of User-Centered Design",
        lessons: 5,
        duration: "1 hour",
      },
      { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
      { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
    ],
    reviews: [
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
    ],
  },
  {
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiD4MDkb86X8t9nq-LrEMp3r-bHdx3_D2LUELSBNKYmbmvZbcrQ4TXMM3MRJxriNRWkFGYxtZfdIk_kKDy3QLtEkCVN5REHToYQeoxfsr47YNhNI865r9-7OgYMcI2jPvGWDlD927NKZoI8FyZrOK1YMloHST4NHaL_d8MIox8T5VK2rIbbKh37sHotYmU/s320-rw/3959106_03de_6.jpg",
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
      {
        title: "Basics of User-Centered Design",
        lessons: 5,
        duration: "1 hour",
      },
      { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
      { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
    ],
    reviews: [
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
    ],
  },
];

const Courses = () => {
  // const [selectedCategory, setSelectedCategory] = useState([]);

  return (
    <section>
      <NavigationText placeTo="Danh sách khóa học" />

      <div className="flex gap-[32px] pt-[32px] pb-[90px] items-start justify-between px-28">
        <div className="basis-[calc(75%-16px)]">
          <div className="flex items-center justify-between gap-5 mb-[32px]">
            <h3 className="text-[32px] font-semibold">Tất cả khóa học</h3>
            <div className="relative">
              <Input
                name="search"
                content="Tìm kiếm"
                style="pr-16"
                icon={
                  <Search
                    size={20}
                    className="absolute right-4 top-[50%] transform translate-y-[-50%]"
                  />
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-[32px]">
            {listCourses.map((course, index) => (
              <div
                key={index}
                className="rounded-[20px] border-2 border-slate-200 flex gap-[8px]"
              >
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
                    <h3 className="text-[24px] font-semibold">
                      {course?.courseName}
                    </h3>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-[16px] h-[16px]"
                          src={ClockImg}
                          alt=""
                        />
                        <span className="text-[16px] font-medium text-[#555555] mt-1">
                          {course?.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="w-[16px] h-[16px]"
                          src={EducationImg}
                          alt=""
                        />
                        <span className="text-[16px] font-medium text-[#555555] mt-1">
                          {course?.students}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="w-[16px] h-[16px]"
                          src={RankImg}
                          alt=""
                        />
                        <span className="text-[16px] font-medium text-[#555555] mt-1">
                          Nâng cao
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="w-[16px] h-[16px]"
                          src={LessonsImg}
                          alt=""
                        />
                        <span className="text-[16px] font-medium text-[#555555] mt-1">
                          20 bài học
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 border-t border-slate-300 flex items-center justify-between gap-3 text-[18px]">
                    <p className="text-[#9d9d9d] font-medium">
                      {course?.price}đ
                    </p>
                    <Button
                      title="Xem thêm"
                      type="secondary"
                      style="border-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[32px] basis-[calc(25%-16px)]">
          <CourseFilter label="Loại khóa học" listItem={categoryList} />
          <CourseFilter label="Giảng viên" listItem={teacherList} />
          <CourseFilter label="Giá" listItem={priceList} />
          <CourseFilter label="Đánh giá" listItem={reviewList} type="star" />
          <CourseFilter label="Trình độ" listItem={levelList} />
        </div>
      </div>
    </section>
  );
};

export default Courses;
