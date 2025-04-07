import { ChevronDown } from "lucide-react";

const CourseLessons = ({ courseInfo }) => {
  return (
    <div className="py-[32px] border-b border-slate-300">
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
              <p className="font-medium text-[#555555]">{item?.duration} giờ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLessons;
