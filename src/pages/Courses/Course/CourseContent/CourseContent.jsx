const CourseContent = ({ courseInfo }) => {
  return (
    <div className="py-[16px] z-100 border-b border-slate-300 max-w-4xl">
      <div className="flex flex-col gap-2 py-4">
        <h3 className="md:text-[20px] text-[18px] font-semibold">
          Nội dung khóa học
        </h3>
        <p
          className="md:max-w-[50%] sm:max-w-[70%] max-w-full md:text-[16px] 
        text-[14px] font-medium text-[#555555]"
        >
          {courseInfo?.description || courseInfo?.courseDescription}
        </p>
      </div>
    </div>
  );
};

export default CourseContent;
