import { linkBoxInfo } from "~/pages/Courses/Course/CourseLinkBox/constants";

const CourseLinkBox = () => {
  return (
    <div className="flex items-center gap-[24px] pt-[40px] pb-[24px] border-b border-slate-300 max-w-3xl">
      {linkBoxInfo.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-center w-[148px] h-[57px] rounded-[8px] bg-[#eff6ff] cursor-pointer transition hover:opacity-80"
        >
          <span className="text-[14px] text-[#555555] font-medium">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CourseLinkBox;
