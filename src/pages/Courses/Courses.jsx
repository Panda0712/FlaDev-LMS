// import { useState } from "react";
import ExampleAvatar from "~/assets/images/example-avatar-2.png";
import CourseCard from "~/components/CourseCard/CourseCard";
import NavigationText from "~/components/NavigationText/NavigationText";
import {
  categoryList,
  levelList,
  priceList,
  reviewList,
  teacherList,
} from "~/pages/Courses/constants";
import CourseFilter from "~/pages/Courses/CourseFilter/CourseFilter";
import CoursesCard from "~/pages/Courses/CoursesCard/CoursesCard";
import CoursesSearch from "~/pages/Courses/CoursesSearch/CoursesSearch";
import TeacherCard from "~/pages/Profile/TeacherCard/TeacherCard";

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

const listTeachers = [
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
    rating: 4.6,
    studentsCount: 10000,
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
    rating: 4.6,
    studentsCount: 10000,
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
    rating: 4.6,
    studentsCount: 10000,
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
    rating: 4.6,
    studentsCount: 10000,
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
    rating: 4.6,
    studentsCount: 10000,
  },
];

const Courses = () => {
  // const [selectedCategory, setSelectedCategory] = useState([]);

  return (
    <section>
      <NavigationText placeTo="Danh sách khóa học" />

      <div className="pt-[32px] pb-[90px] px-28">
        <div className="flex gap-[32px] items-start justify-between">
          <div className="basis-[calc(75%-16px)]">
            <CoursesSearch />
            <div className="flex flex-col gap-[32px]">
              {listCourses.map((course, index) => (
                <CoursesCard key={index} course={course} />
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

        <div className="mt-24">
          <h3 className="text-[24px] font-semibold">Giảng viên nổi bật</h3>
          <div className="relative mt-5 grid grid-cols-5 gap-[40px]">
            {listTeachers.map((teacher, index) => (
              <TeacherCard key={index} teacher={teacher} type="popular" />
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-[24px] font-semibold">Khóa học nổi bật</h3>
          <div className="relative mt-5 grid grid-cols-4 gap-[30px]">
            {listCourses.map((course, index) => (
              <CourseCard key={index} course={course} type="secondary" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
