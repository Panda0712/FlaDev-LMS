import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchOrders, fetchReviews } from "~/apis/endpoints";
import CourseCard from "~/components/CourseCard/CourseCard";
import Input from "~/components/Input/Input";
import Loading from "~/components/Loading/Loading";

const ListCourses = () => {
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  const reviewsListCourses = reviews.map((review) => {
    const foundCourse = orderedCourses.find(
      (order) => String(order?.courseId) === review?.courseId
    );
    const totalRatingCount = reviews.filter(
      (review) => review?.courseId === foundCourse?.courseId
    )?.length;
    const totalRatingValue = reviews.reduce(
      (acc, review) =>
        review?.courseId === foundCourse?.courseId ? acc + review?.rating : acc,
      0
    );
    const averageRating = Math.floor(totalRatingValue / totalRatingCount) || 0;

    return {
      ...review,
      courseName: foundCourse?.courseName,
      averageRating,
    };
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchOrders(), fetchReviews()])
      .then(([ordersRes, reviewsRes]) => {
        setOrderedCourses(
          ordersRes?.filter(
            (order) => String(order.userId) === currentUser?.id
          ) || []
        );
        setReviews(reviewsRes || []);
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
        <h3 className="md:text-[24px] text-[20px] font-semibold">
          Danh sách khóa học
        </h3>
        <span className="md:text-[18px] text-[16px] font-semibold">
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
      </div>

      <div
        className="relative mt-5 grid lg:grid-cols-3 md:grid-cols-2 
      max-[500px]:grid-cols-1! max-sm:grid-cols-2 gap-[30px]"
      >
        {!orderedCourses?.length && (
          <p className="md:text-[18px] text-[16px] font-medium">
            Hiện chưa có khóa học nào!!!
          </p>
        )}
        {orderedCourses?.length > 0 &&
          orderedCourses.map((course, index) => (
            <CourseCard
              key={index}
              reviewsListCourses={reviewsListCourses}
              course={course}
              type="secondary"
              learning
            />
          ))}
      </div>
    </section>
  );
};

export default ListCourses;
