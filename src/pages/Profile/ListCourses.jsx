import { ChevronDown, FilterIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchOrders } from "~/apis/endpoints";
import CourseCard from "~/components/CourseCard/CourseCard";
import Input from "~/components/Input/Input";
import Loading from "~/components/Loading/Loading";

const ListCourses = () => {
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    setLoading(true);
    fetchOrders()
      .then((res) => {
        setOrderedCourses(
          res?.filter((order) => String(order.userId) === currentUser?.id) || []
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

  if (loading) return <Loading />;

  return (
    <section className="w-full pb-[90px]">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-[24px] font-semibold">Danh sách khóa học</h3>
        <span className="text-[18px] font-semibold">
          ({orderedCourses?.length})
        </span>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="relative">
          <Input
            name="name"
            content="Tìm khóa học"
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

      <div className="relative mt-5 grid grid-cols-3 gap-[30px]">
        {!orderedCourses?.length && (
          <p className="text-[18px] font-medium">
            Hiện chưa có khóa học nào!!!
          </p>
        )}
        {orderedCourses?.length > 0 &&
          orderedCourses.map((course, index) => (
            <CourseCard key={index} course={course} type="secondary" learning />
          ))}
      </div>
    </section>
  );
};

export default ListCourses;
