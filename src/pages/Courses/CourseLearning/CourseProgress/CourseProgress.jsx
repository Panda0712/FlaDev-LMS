import { ChevronDown, ChevronUp } from "lucide-react";
import BlankCheckBoxImg from "~/assets/images/blank-checkbox.png";
import CheckBoxImg from "~/assets/images/checkbox.png";
import RecorderImg from "~/assets/images/recorder.png";

const CourseProgress = ({
  openItemList,
  courseModule = [],
  currentActiveLesson,
  handleChangeActiveLesson,
  handleToggleList,
  progressInfo,
  lessonDurations,
}) => {
  return (
    <div className="flex flex-col w-full">
      {courseModule?.map((item, index) => (
        <div
          key={index}
          className="rounded-md flex flex-col items-center justify-start"
        >
          <div
            onClick={() => handleToggleList(index)}
            className={`${
              index < courseModule?.length - 1
                ? "border-b border-slate-300"
                : ""
            } flex items-center gap-4 cursor-pointer transition 
            hover:bg-slate-200 py-[24px] px-[20px] w-full`}
          >
            {openItemList?.[index]?.active ? (
              <ChevronDown size={24} />
            ) : (
              <ChevronUp size={24} />
            )}
            <p className="font-semibold md:text-[18px] text-[16px]">
              {item?.title}
            </p>
          </div>
          <div
            className={`${
              openItemList?.[index]?.active ? "flex w-full flex-col" : "hidden"
            } transition`}
          >
            {courseModule?.[index]?.lessons?.map((lesson, lessonIndex) => (
              <div
                key={lessonIndex}
                onClick={() => handleChangeActiveLesson(lesson?.name)}
                className={`${
                  currentActiveLesson === lesson?.name
                    ? "bg-[#0f172a] text-white"
                    : ""
                } flex w-full items-start justify-between gap-2 pt-4 pb-5 
                px-[20px] cursor-pointer transition hover:bg-[#0f172a] hover:text-white`}
              >
                <div className="flex gap-2">
                  <img
                    src={
                      lesson?.completed ||
                      (progressInfo?.completedLessons?.length &&
                        progressInfo?.completedLessons?.includes(lesson?.name))
                        ? CheckBoxImg
                        : BlankCheckBoxImg
                    }
                    className="w-[24px] h-[24px]"
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <p className="max-w-[200px]">
                      {lessonIndex + 1}. {lesson?.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={RecorderImg}
                        className="w-[24px] h-[24px] text-[#64748b]"
                        alt=""
                      />
                      <p className="text-[#64748b] md:text-[16px] text-[14px]">
                        {lessonDurations[lesson?.name] &&
                          `${Math.floor(
                            lessonDurations[lesson?.name] / 60
                          )}m${Math.floor(
                            lessonDurations[lesson?.name] % 60
                          )}s`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseProgress;
