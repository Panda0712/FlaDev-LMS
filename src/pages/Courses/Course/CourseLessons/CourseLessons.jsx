import { ChevronDown, ChevronUp } from "lucide-react";
import RecorderImg from "~/assets/images/recorder.png";
import useToggleLessons from "~/hooks/useToggleLessons";

const CourseLessons = ({ courseInfo }) => {
  const { openItemList, handleToggleList } = useToggleLessons({
    toggleData: courseInfo?.courseModules,
  });

  return (
    <div className="py-[32px] border-b border-slate-300">
      <h3 className="md:text-[20px] text-[18px] font-semibold">Chương trình</h3>

      <div className="flex flex-col mt-5 pb-8">
        {courseInfo?.courseModules?.map((item, index) => (
          <div key={index} className="rounded-md flex flex-col justify-start">
            <div
              className="p-[24px] cursor-pointer rounded-md flex max-md:flex-wrap items-center 
            justify-between gap-5 border border-slate-300"
            >
              <div
                onClick={() => handleToggleList(index)}
                className="flex items-center gap-4"
              >
                {openItemList[index]?.active ? (
                  <ChevronDown size={24} />
                ) : (
                  <ChevronUp size={24} />
                )}{" "}
                <p className="font-semibold md:text-[18px] text-[16px]">
                  {item?.title}
                </p>
              </div>
              <div className="flex max-md:hidden items-center gap-4">
                <p className="font-medium text-[#555555]">
                  {item?.lessons.length} bài học
                </p>
                <p className="font-medium text-[#555555]">
                  {item?.duration} giờ
                </p>
              </div>
            </div>

            <div
              className={`${
                openItemList[index]?.active ? "flex flex-col" : "hidden"
              } transition`}
            >
              {courseInfo?.courseModules[index]?.lessons?.map(
                (lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex items-start justify-between gap-5 pt-4 
                    pb-5 px-[36px] transition border border-slate-300"
                  >
                    <div className="flex gap-2">
                      <p className="font-medium">
                        {lessonIndex + 1}. {lesson?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={RecorderImg}
                        className="w-[24px] h-[24px] text-[#64748b]"
                        alt=""
                      />
                      <p className="text-[#64748b] md:text-[16px] text-[14px]">
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
  );
};

export default CourseLessons;
