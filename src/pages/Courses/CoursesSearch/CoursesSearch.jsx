import { Search } from "lucide-react";
import Input from "~/components/Input/Input";

const CoursesSearch = ({ searchQuery, handleChangeSearchValue }) => {
  return (
    <div className="flex items-center justify-between gap-5 mb-[32px]">
      <h3 className="text-[32px] font-semibold">Tất cả khóa học</h3>
      <div className="relative">
        <Input
          name="search"
          value={searchQuery}
          onChange={handleChangeSearchValue}
          content="Tìm kiếm"
          style="pr-16"
          icon={
            <Search
              size={20}
              className="absolute right-4 top-[50%] transform translate-y-[-50%]"
            />
          }
        />
      </div>
    </div>
  );
};

export default CoursesSearch;
