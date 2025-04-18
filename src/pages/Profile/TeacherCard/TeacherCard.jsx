import StarImg from "~/assets/images/star.png";

const TeacherCard = ({ teacher, type }) => {
  return (
    <div className="border border-[#e2e8f0] rounded-[16px] p-[16px] text-center">
      <img
        src={teacher?.avatar}
        className="w-full h-[132px] object-cover rounded-[8px]"
        alt=""
      />
      <h3 className="text-[20px] font-semibold mt-4 leading-[1.1]">
        {teacher?.name}
      </h3>
      <p className="text-[16px] text-[#555555] font-medium my-1">
        {teacher?.role}
      </p>

      {type === "popular" && (
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src={StarImg} className="w-[20px] h-[20px]" alt="" />
            <span className="font-semibold mt-[2px]">{teacher?.rating}</span>
          </div>
          <p className="font-semibold text-[#555555] mt-[2px]">
            {teacher?.studentsCount} học sinh
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherCard;
