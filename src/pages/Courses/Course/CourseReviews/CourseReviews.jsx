import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createReview, deleteReview } from "~/apis/endpoints";
import StarImg from "~/assets/images/star.png";
import Button from "~/components/Button/Button";
import Star from "~/components/Star/Star";

const CourseReviews = ({ currentUser, reviews, courseInfo }) => {
  const [reviewsList, setReviewsList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [reviewValue, setReviewValue] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleSubmit = async () => {
    if (!reviewValue.trim()) {
      toast.error("Vui lòng nhập đánh giá!!!");
      return;
    }

    setSubmitting(true);

    const newReview = {
      userId: currentUser?.id,
      userAvatar:
        currentUser?.avatar ||
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      userName: currentUser?.username,
      courseId: courseInfo?.id,
      content: reviewValue,
      rating: ratingValue,
    };

    toast
      .promise(createReview(newReview), {
        pending: "Đang tạo đánh giá....",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Thêm đánh giá thành công!!!");
          setReviewsList((prev) => [res, ...prev]);
        }
        setReviewValue("");
        setRatingValue(5);
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.message ||
            "Có lỗi xảy ra khi thêm đánh giá!! Vui lòng thử lại sau!!"
        );
      });
  };

  const showDeleteModal = (review) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedReview) return;

    const reviewId = selectedReview?.id;
    setReviewsList((prev) => prev.filter((review) => review.id !== reviewId));

    toast
      .promise(deleteReview(reviewId), {
        pending: "Đang xóa đánh giá...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa đánh giá thành công!!!");
        }
      });
  };

  useEffect(() => {
    const courseReviews =
      reviews.filter((review) => review?.courseId === courseInfo?.id) || [];

    if (courseReviews?.length) {
      setReviewsList(courseReviews);
    }
  }, [courseInfo?.id, reviews]);

  return (
    <section className="py-[32px]">
      <h3 className="text-[20px] font-semibold">Đánh giá học viên</h3>

      <div className="flex gap-5 justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-[24px]">
            <div className="flex items-center gap-2">
              <img src={StarImg} className="w-[20px] h-[20px]" alt="" />
              <span className="text-[20px] leading-1 mt-[2px] font-semibold">
                {courseInfo?.rating || 5}
              </span>
            </div>
            <p className="text-[18px] leading-1 mt-[4px] font-semibold text-[#555555]">
              {courseInfo?.rating || 0} đánh giá
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={courseInfo?.rating || 5} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              {courseInfo?.percent || 0}%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={4} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              {courseInfo?.percent || 0}%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={3} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              {courseInfo?.percent || 0}%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={2} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              {courseInfo?.percent || 0}%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={1} />
            <p className="text-[18px] font-medium text-[#555555]">
              {courseInfo?.percent || 0}%
            </p>
          </div>
        </div>

        <div className="relative flex flex-col gap-[16px] basis-[60%]">
          {courseInfo?.reviews?.map((review, index) => (
            <div
              key={index}
              className="rounded-[16px] border border-slate-200 p-[24px] flex items-start justify-between gap-5 basis-[100%]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review?.avatar}
                  className="w-[60px] h-[60px] object-cover"
                  alt=""
                />
                <span className="text-[20px] font-semibold">
                  {review?.name}
                </span>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <img src={StarImg} className="w-[20px] h-[20px]" alt="" />
                    <span className="text-[20px] font-semibold leading-1 mt-[4px]">
                      {review?.rating}
                    </span>
                  </div>

                  <p className="text-[#555555] font-medium mt-[3px]">
                    Đánh giá vào {review?.reviewedAt}
                  </p>
                </div>

                <p className="max-w-xl font-medium text-[#334155]">
                  {review?.content}
                </p>
              </div>
            </div>
          ))}

          <Button
            title="Hiện thêm đánh giá"
            type="secondary"
            style="max-w-[180px] py-3 rounded-[8px] border border-[#0f172a] mt-2"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseReviews;
