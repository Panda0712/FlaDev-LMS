import { useState } from "react";
import Logo from "/logo.jpg";
import CourseContent from "~/pages/Courses/Course/CourseContent/CourseContent";
import CourseInstructor from "~/pages/Courses/Course/CourseInstructor/CourseInstructor";
import CourseLinkBox from "~/pages/Courses/Course/CourseLinkBox/CourseLinkBox";
import CourseReviews from "~/pages/Courses/Course/CourseReviews/CourseReviews";
import CourseSuggestion from "~/pages/Courses/Course/CourseSuggestion/CourseSuggestion";
import CourseAim from "~/pages/Courses/CourseLearning/CourseAim/CourseAim";
import CourseProgress from "~/pages/Courses/CourseLearning/CourseProgress/CourseProgress";
import CourseVideo from "~/pages/Courses/CourseLearning/CourseVideo/CourseVideo";

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
    {
      title: "Introduction to UX Design",
      lessons: 5,
      listLessons: [
        {
          id: 1,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: true,
        },
        {
          id: 2,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: true,
        },
        {
          id: 3,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: false,
        },
      ],
      duration: "1 hour",
    },
    {
      title: "Basics of User-Centered Design",
      lessons: 5,
      listLessons: [
        {
          id: 4,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: false,
        },
        {
          id: 5,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: true,
        },
        {
          id: 6,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: true,
        },
      ],
      duration: "1 hour",
    },
    {
      title: "Elements of User Experience",
      lessons: 5,
      listLessons: [
        {
          id: 7,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: true,
        },
        {
          id: 8,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: false,
        },
        {
          id: 9,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: true,
        },
      ],
      duration: "1 hour",
    },
    {
      title: "Visual Design Principles",
      lessons: 5,
      listLessons: [
        {
          id: 10,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: false,
        },
        {
          id: 11,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: false,
        },
        {
          id: 12,
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
          completed: true,
        },
      ],
      duration: "1 hour",
    },
  ],
  keyConcepts: [
    "Gain a clear understanding of what User Experience (UX) Design entails and its importance in today's digital world.",
    "Explore the fundamental principles of user-centered design and how to apply them to create intuitive and user-friendly interfaces",
    "Learn about the various elements that contribute to a positive user experience, including information architecture, interaction design, and visual design.",
    "Introduction to UX Design",
  ],
  reviews: [
    {
      avatar: Logo,
      name: "John Doe",
      reviewedAt: "22/3/2024",
      rating: 5,
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      avatar: Logo,
      name: "John Doe",
      reviewedAt: "22/3/2024",
      rating: 5,
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      avatar: Logo,
      name: "John Doe",
      reviewedAt: "22/3/2024",
      rating: 5,
      content:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
  ],
};

const CourseLearning = () => {
  const [openItemList, setOpenItemList] = useState(
    courseInfo?.courseModule?.map((_, index) => ({
      current: index,
      active: false,
    }))
  );
  const [currentActiveLesson, setCurrentActiveLesson] = useState(
    courseInfo?.courseModule[0]?.listLessons[0]?.id
  );

  const handleChangeActiveLesson = (lessonId) => {
    if (lessonId === currentActiveLesson) return;

    setCurrentActiveLesson(lessonId);
  };

  const handleToggleList = (index) => {
    setOpenItemList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <section className="px-28 pt-[32px] pb-[90px]">
      <h3 className="text-[24px] font-semibold mb-[32px]">
        {courseInfo?.courseName}
      </h3>

      <div className="flex items-start gap-[32px]">
        <div className="basis-[calc(70%-16px)]">
          <CourseVideo thumbnail={courseInfo?.thumbnail} />

          <CourseLinkBox />

          <CourseContent courseInfo={courseInfo} />

          <CourseAim courseInfo={courseInfo} />

          <CourseInstructor courseInfo={courseInfo} />
        </div>
        <div className="basis-[calc(30%-16px)] rounded-[16px] bg-[#faf8fc] py-[20px] pb-0 border-2 border-slate-200">
          <h3 className="text-[24px] font-semibold mt-2 mb-5 px-[20px]">
            Tiến độ hoàn thành
          </h3>

          <CourseProgress
            openItemList={openItemList}
            courseModule={courseInfo?.courseModule}
            currentActiveLesson={currentActiveLesson}
            handleToggleList={handleToggleList}
            handleChangeActiveLesson={handleChangeActiveLesson}
          />
        </div>
      </div>

      <CourseSuggestion style="bg-white" />

      <CourseReviews courseInfo={courseInfo} />
    </section>
  );
};

export default CourseLearning;
