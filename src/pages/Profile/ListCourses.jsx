import { ChevronDown, FilterIcon, Search } from "lucide-react";
import ExampleAvatar from "~/assets/images/example-avatar.png";
import CourseCard from "~/components/CourseCard/CourseCard";
import Input from "~/components/Input/Input";

const listCourses = [
  {
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

const ListCourses = () => {
  return (
    <section className="w-full pb-[90px]">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-[24px] font-semibold">Danh sách khóa học</h3>
        <span className="text-[18px] font-semibold">(12)</span>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="relative">
          <Input
            name="name"
            content="Tìm khóa học"
            icon={
              <Search className="absolute right-2 top-[50%] transform translate-y-[-50%]" />
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[18px] font-medium">Sắp xếp theo</p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 hover:bg-gray-100">
              <span className="text-[18px] font-medium">Liên quan</span>
              <ChevronDown size={18} />
            </button>

            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 hover:bg-gray-100">
              <FilterIcon size={18} />
              <span className="text-[18px] font-medium">Bộ lọc</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-[30px]">
        {listCourses.map((course, index) => (
          <CourseCard key={index} course={course} type="secondary" />
        ))}
      </div>
    </section>
  );
};

export default ListCourses;
