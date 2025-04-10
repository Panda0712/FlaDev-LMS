import Star from "~/components/Star/Star";

const CourseFilter = ({ label, listItem, type }) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[24px] font-semibold">{label}</h3>
      <div className="flex flex-col gap-4">
        {listItem.map((item) => (
          <div className="flex items-center justify-between gap-5 text-[18px] font-medium text-[#555555]">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                // checked={selected.includes(item)}
                className="form-checkbox"
              />
              {type === "star" ? (
                <Star value={item.name} />
              ) : (
                <p>{item.name}</p>
              )}
            </div>
            <span>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseFilter;
