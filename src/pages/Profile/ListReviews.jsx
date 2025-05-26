import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCourseById, fetchReviews } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import Loading from "~/components/Loading/Loading";
import ReviewCard from "~/pages/Profile/ReviewCard/ReviewCard";

const ListReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const currentUser = useSelector((state) => state.auth.user);
  const totalPages = Math.ceil(reviews?.length / 4);
  const endIndex = currentPage * 4;
  const currentReviews = reviews?.slice(0, endIndex);

  const handleLoadMore = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setLoading(true);
    fetchReviews()
      .then((res) => {
        const reviewsList = res || [];
        const reviewsByUser = reviewsList.filter(
          (review) => review?.userId === currentUser?.id
        );
        const courseNamePromise = reviewsByUser?.map((review) =>
          fetchCourseById(review?.courseId)
        );
        Promise.all(courseNamePromise)
          .then((res) => {
            const courseNames = res?.map((course) => course?.name);
            const newReviewsList = reviewsByUser?.map((review, index) => ({
              ...review,
              courseName: courseNames[index] || "",
            }));
            setReviews(newReviewsList || []);
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.message);
          })
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Lỗi khi lấy dữ liệu đánh giá!!!");
        setLoading(false);
      });
  }, [currentUser?.id]);

  if (loading) return <Loading />;

  return (
    <section className="w-full pb-[90px]">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="md:text-[24px] text-[20px] font-semibold">Đánh giá</h3>
        <span className="md:text-[18px] text-[16px] font-semibold">
          ({reviews?.length})
        </span>
      </div>

      <div className="flex flex-col gap-[16px]">
        {!currentReviews?.length && (
          <p className="md:text-[18px] text-[16px] font-medium">
            Hiện chưa có đánh giá nào!!!
          </p>
        )}
        {currentReviews?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
        {currentPage < totalPages && (
          <Button
            onClick={handleLoadMore}
            title="Hiện thêm đánh giá"
            type="secondary"
            style="max-w-[180px] py-3 rounded-[8px] border border-[#0f172a] mt-2"
          />
        )}
      </div>
    </section>
  );
};

export default ListReviews;
