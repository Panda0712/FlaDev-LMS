import { ChevronDown, FilterIcon, Search } from "lucide-react";
import ExampleAvatar from "~/assets/images/example-avatar-2.png";
import Input from "~/components/Input/Input";
import TeacherCard from "~/pages/Profile/TeacherCard/TeacherCard";

const listTeachers = [
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
  {
    avatar: ExampleAvatar,
    name: "John Doe",
    role: "Software Engineer",
  },
];

const ListTeachers = () => {
  return (
    <section className="w-full pb-[90px]">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-[24px] font-semibold">Giảng viên</h3>
        <span className="text-[18px] font-semibold">(12)</span>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="relative">
          <Input
            name="name"
            content="Tìm giảng viên"
            icon={
              <Search className="absolute right-2 top-[50%] transform translate-y-[-50%]" />
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[18px] font-medium">Sắp xếp theo</p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 hover:bg-gray-100">
              <span className="text-[18px] font-medium">Liên quan</span>
              <ChevronDown size={18} />
            </button>

            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 hover:bg-gray-100">
              <FilterIcon size={18} />
              <span className="text-[18px] font-medium">Bộ lọc</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-4 gap-[20px]">
        {listTeachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
    </section>
  );
};

export default ListTeachers;
