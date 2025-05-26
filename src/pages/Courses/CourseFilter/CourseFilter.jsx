import Star from "~/components/Star/Star";

const CourseFilter = ({
  radioId,
  label,
  onChange,
  selectedCategory = null,
  selectedReview = null,
  listItem,
  type,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="md:text-[24px] text-[20px] font-semibold">{label}</h3>
      <div className="flex flex-col gap-4">
        {listItem?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-5 
            md:text-[18px] text-[16px] font-medium text-[#555555]"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked={
                  (radioId === "course-category" &&
                    selectedCategory === item.name) ||
                  (radioId === "course-review" &&
                    Number(selectedReview) === Number(item.name))
                }
                value={item.name}
                onChange={onChange}
                className="form-checkbox"
                id={radioId}
              />
              {type === "star" ? (
                <div className="flex gap-2 items-center">
                  <p>{item.name}</p>
                  <Star value={item.name} />
                </div>
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
