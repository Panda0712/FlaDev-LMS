import { ChevronDown, ChevronUp, Play } from "lucide-react";
import { useState } from "react";
import ExampleAvatar from "~/assets/images/example-avatar-2.png";
import CourseContent from "~/pages/Courses/Course/CourseContent/CourseContent";
import CourseInstructor from "~/pages/Courses/Course/CourseInstructor/CourseInstructor";
import CourseLinkBox from "~/pages/Courses/Course/CourseLinkBox/CourseLinkBox";
import CourseReviews from "~/pages/Courses/Course/CourseReviews/CourseReviews";
import CourseSuggestion from "~/pages/Courses/Course/CourseSuggestion/CourseSuggestion";
import CourseAim from "~/pages/Courses/CourseLearning/CourseAim/CourseAim";
import RecorderImg from "~/assets/images/recorder.png";
import CheckBoxImg from "~/assets/images/checkbox.png";
import BlankCheckBoxImg from "~/assets/images/blank-checkbox.png";

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
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
      ],
      duration: "1 hour",
    },
    {
      title: "Basics of User-Centered Design",
      lessons: 5,
      listLessons: [
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
      ],
      duration: "1 hour",
    },
    {
      title: "Elements of User Experience",
      lessons: 5,
      listLessons: [
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
      ],
      duration: "1 hour",
    },
    {
      title: "Visual Design Principles",
      lessons: 5,
      listLessons: [
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
        },
        {
          name: "What is User Experience (UX) Design?",
          duration: "4min",
          videoUrl: "",
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
};

const CourseLearning = () => {
  const [openItemList, setOpenItemList] = useState(
    courseInfo?.courseModule?.map((_, index) => ({
      current: index,
      active: false,
    }))
  );

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
          <div className="relative">
            <img
              src={courseInfo?.thumbnail}
              className="w-full min-h-[450px] object-cover rounded-[16px]"
              alt=""
            />
            <div
              className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] 
            w-[100px] h-[100px] shadow-sm cursor-pointer transition hover:opacity-80 bg-white rounded-full flex items-center justify-center"
            >
              <Play size={44} className="fill-black" />
            </div>
          </div>

          <CourseLinkBox />

          <CourseContent courseInfo={courseInfo} />

          <CourseAim courseInfo={courseInfo} />

          <CourseInstructor courseInfo={courseInfo} />
        </div>
        <div className="basis-[calc(30%-16px)] rounded-[16px] bg-[#faf8fc] py-[20px] pb-0 border-2 border-slate-200">
          <h3 className="text-[24px] font-semibold mt-2 mb-5 px-[20px]">
            Tiến độ hoàn thành
          </h3>

          <div className="flex flex-col w-full">
            {courseInfo?.courseModule?.map((item, index) => (
              <div
                key={index}
                className="rounded-md flex flex-col items-center justify-start"
                onClick={() => handleToggleList(index)}
              >
                <div
                  className={`${
                    index < courseInfo?.courseModule?.length - 1
                      ? "border-b border-slate-300"
                      : ""
                  } flex items-center gap-4 cursor-pointer transition hover:bg-slate-200 py-[24px] px-[20px] w-full`}
                >
                  {openItemList[index]?.active ? (
                    <ChevronDown size={24} />
                  ) : (
                    <ChevronUp size={24} />
                  )}
                  <p className="font-semibold text-[18px]">{item?.title}</p>
                </div>
                <div
                  className={`${
                    openItemList[index]?.active ? "flex flex-col" : "hidden"
                  } transition`}
                >
                  {courseInfo?.courseModule[index]?.listLessons?.map(
                    (lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-start justify-between gap-5 pt-4 pb-5 px-[20px] cursor-pointer transition hover:bg-[#0f172a] hover:text-white"
                      >
                        <div className="flex gap-2">
                          <img
                            src={CheckBoxImg}
                            className="w-[24px] h-[24px]"
                            alt=""
                          />
                          <p>
                            {lessonIndex + 1}. {lesson?.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src={RecorderImg}
                            className="w-[24px] h-[24px] text-[#64748b]"
                            alt=""
                          />
                          <p className="text-[#64748b] text-[16px]">
                            {lesson?.duration}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CourseSuggestion style="bg-white" />

      <CourseReviews courseInfo={courseInfo} />
    </section>
  );
};

export default CourseLearning;
