const CourseAim = ({ courseInfo }) => {
  return (
    <div className="py-[16px] border-b border-slate-300">
      <div className="flex flex-col gap-2 py-4">
        <h3 className="text-[20px] font-semibold">Mục tiêu đạt được</h3>
        <ul className="list-disc px-5">
          {courseInfo?.keyConcepts?.map((keyItem, index) => (
            <li
              key={index}
              className="max-w-[70%] mb-2 text-[16px] font-medium text-[#555555]"
            >
              {keyItem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseAim;
