const CourseContent = ({ courseInfo }) => {
  return (
    <div className="py-[16px] border-b border-slate-300">
      <div className="flex flex-col gap-2 py-4">
        <h3 className="text-[20px] font-semibold">Nội dung khóa học</h3>
        <p className="max-w-[50%] text-[16px] font-medium text-[#555555]">
          {courseInfo?.description}
        </p>
      </div>
    </div>
  );
};

export default CourseContent;
