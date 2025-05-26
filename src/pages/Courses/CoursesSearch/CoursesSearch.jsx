import { Search } from "lucide-react";
import Input from "~/components/Input/Input";

const CoursesSearch = ({
  handleSearch,
  searchQuery,
  handleChangeSearchValue,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 mb-[32px]">
      <h3
        className="lg:text-[32px] md:text-[28px] 
      sm:text-[24px] text-[20px] font-semibold"
      >
        Tất cả khóa học
      </h3>
      <div className="relative">
        <Input
          name="search"
          value={searchQuery}
          onChange={handleChangeSearchValue}
          content="Tìm kiếm"
          style="pr-16 max-sm:h-[40px]!"
          icon={
            <Search
              onClick={handleSearch}
              size={20}
              className="absolute cursor-pointer right-4 top-[50%] transform translate-y-[-50%]"
            />
          }
        />
      </div>
    </div>
  );
};

export default CoursesSearch;
