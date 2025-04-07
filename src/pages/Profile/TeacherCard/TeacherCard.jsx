const TeacherCard = ({ teacher }) => {
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
    </div>
  );
};

export default TeacherCard;
