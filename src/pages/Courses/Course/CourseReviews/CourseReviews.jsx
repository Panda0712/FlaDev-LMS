import { Comment } from "@ant-design/compatible";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, List, Modal, Rate, Spin, message } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createReview,
  deleteReview,
  fetchReviews,
  updateReview,
} from "~/apis/endpoints";
import StarImg from "~/assets/images/star.png";
import ButtonComp from "~/components/Button/Button";
import Star from "~/components/Star/Star";

const { TextArea } = Input;

const CourseReviews = ({ loading, currentUser, reviews, courseInfo }) => {
  const [reviewsList, setReviewsList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [reviewValue, setReviewValue] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviewsList?.length / 4);
  const endIndex = currentPage * 4;
  const currentReviews = reviewsList?.slice(0, endIndex);

  const totalRating =
    reviewsList.reduce((acc, review) => acc + review.rating, 0) || 0;
  const averageRating = Math.floor(
    totalRating / reviewsList?.length || 5
  ).toFixed(1);

  const listRateValue = Array.from({ length: 5 }, (_, index) => index + 1).map(
    (item) => {
      const countValue =
        reviewsList.filter((review) => review.rating === item) || [];
      const countPercent =
        Math.floor((countValue.length / reviewsList.length) * 100).toFixed(1) ||
        0;

      return {
        value: item,
        percent: Number(countPercent) || 0,
      };
    }
  );

  const handleLoadMorePage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
    setReviewsList((prev) => prev.filter((review) => review?.id !== reviewId));

    toast
      .promise(deleteReview(reviewId), {
        pending: "Đang xóa đánh giá...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa đánh giá thành công!!!");
        } else {
          fetchReviews().then((res) => {
            const reviews = res || [];
            const reviewsByCourseId = reviews.filter(
              (review) => review.courseId === courseInfo?.id
            );
            setReviewsList(reviewsByCourseId || []);
          });
        }
        setModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.message || "Lỗi khi xóa đánh giá!! Vui lòng thử lại sau!!!"
        );
      });
  };

  const isReviewOwner = useCallback(
    (review) => {
      return currentUser && review?.userId === currentUser?.id;
    },
    [currentUser]
  );

  const CommentItem = memo(({ comment: review }) => {
    const isOwner = isReviewOwner(review);
    const isEditing = editingReviewId === review?.id;

    const [editReviewValue, setEditReviewValue] = useState(review?.content);
    const [editRatingValue, setEditRatingValue] = useState(review?.rating);

    const startEditing = () => {
      setEditingReviewId(review?.id);
    };

    const cancelEditing = () => {
      setEditingReviewId(null);
    };

    const saveEditedReview = async () => {
      if (!editReviewValue.trim()) {
        message.error("Vui lòng nhập đánh giá!!!");
        return;
      }

      const updatedData = {
        content: editReviewValue,
        rating: editRatingValue,
        updatedAt: new Date().getTime(),
      };

      const updatedReview = { ...review, ...updatedData };
      setReviewsList((prevReviews) =>
        prevReviews.map((c) => (c.id === review?.id ? updatedReview : c))
      );

      toast
        .promise(updateReview(review?.id, updatedData), {
          pending: "Đang chỉnh sửa đánh giá...",
        })
        .then((res) => {
          if (!res.error) {
            toast.success("Chỉnh sửa đánh giá thành công!!!");
          } else {
            fetchReviews().then((res) => {
              const reviews = res || [];
              const reviewsByCourseId = reviews.filter(
                (review) => review?.courseId === courseInfo?.id
              );
              setReviewsList(reviewsByCourseId || []);
            });
          }
          setEditingReviewId(null);
        });
    };

    useEffect(() => {
      if (isEditing) {
        setEditReviewValue(review?.content);
        setEditRatingValue(review?.rating);
      }
    }, [isEditing, review]);

    if (isEditing) {
      return (
        <Comment
          author={
            <span className="font-medium text-blue-600">
              {review?.userName}
            </span>
          }
          avatar={
            <Avatar
              src={review?.userAvatar}
              icon={<UserOutlined />}
              className="border-2 border-blue-100"
            />
          }
          content={
            <>
              <div className="mb-2">
                <Rate value={editRatingValue} onChange={setEditRatingValue} />
              </div>
              <TextArea
                rows={4}
                value={editReviewValue}
                onChange={(e) => setEditReviewValue(e.target.value)}
                className="mt-2 rounded-md border border-gray-300 p-2 w-full focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                autoFocus
              />

              <div className="mt-4 flex space-x-3">
                <Button
                  type="primary"
                  onClick={saveEditedReview}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm transition duration-150"
                >
                  Lưu
                </Button>
                <Button
                  onClick={cancelEditing}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow-sm transition duration-150"
                >
                  Hủy
                </Button>
              </div>
            </>
          }
          datetime={
            <span className="text-gray-500 text-sm">
              {new Date(review?.created_at).toLocaleDateString()}
            </span>
          }
          className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition duration-150"
        />
      );
    }

    return (
      <Comment
        author={
          <span className="font-medium text-gray-800">{review?.userName}</span>
        }
        avatar={
          <Avatar
            src={review?.userAvatar}
            icon={<UserOutlined />}
            className="border-2 border-gray-100"
          />
        }
        content={
          <>
            <div className="mb-1">
              <Rate disabled value={review?.rating} />
            </div>
            <p className="text-gray-700 mt-2">{review?.content}</p>
          </>
        }
        datetime={
          <span className="text-gray-500 text-sm">
            {new Date(review?.created_at).toLocaleDateString()}
          </span>
        }
        actions={
          isOwner
            ? [
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={startEditing}
                  className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                >
                  Sửa
                </Button>,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  danger
                  size="small"
                  onClick={() => showDeleteModal(review)}
                  className="hover:bg-red-50"
                >
                  Xóa
                </Button>,
              ]
            : []
        }
        className="bg-white hover:bg-gray-50 p-4 rounded-lg border border-transparent hover:border-gray-200 transition duration-150"
      />
    );
  });

  useEffect(() => {
    const courseReviews =
      reviews?.filter((review) => review?.courseId === courseInfo?.id) || [];

    if (courseReviews?.length) {
      setReviewsList(courseReviews);
    }
  }, [courseInfo?.id, reviews]);

  return (
    <section className="py-[32px]">
      <h3 className="text-[20px] font-semibold">Đánh giá học viên</h3>

      <div className="flex mt-4 mb-12 gap-5 justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-[24px]">
            <div className="flex items-center gap-2">
              <img src={StarImg} className="w-[20px] h-[20px]" alt="" />
              <span className="text-[20px] leading-1 mt-[2px] font-semibold">
                {averageRating || 5}
              </span>
            </div>
            <p className="text-[18px] leading-1 mt-[4px] font-semibold text-[#555555]">
              {reviewsList?.length || 0} đánh giá
            </p>
          </div>
          {listRateValue?.map((rate, index) => (
            <div key={index} className="flex items-center gap-3">
              <Star value={rate.value} />
              <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
                {rate.percent}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {currentUser && (
        <div className="comment-form mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="md:text-lg text-[16px] font-semibold text-gray-700 mb-4">
            Thêm đánh giá
          </h3>
          <div className="mb-4 flex items-center">
            <span className="mr-3 text-gray-700">Đánh giá của bạn: </span>
            <Rate value={ratingValue} onChange={setRatingValue} />
          </div>
          <TextArea
            rows={4}
            value={reviewValue}
            onChange={(e) => setReviewValue(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn..."
            className="mb-4 rounded-md border border-gray-300 p-3 w-full focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-150"
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={submitting}
            disabled={!reviewValue.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium shadow-sm transition duration-150"
          >
            Đăng
          </Button>
        </div>
      )}

      <div className="comments-list mt-8">
        {loading ? (
          <div className="text-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <h3
              className="md:text-xl sm:text-[18px] text-[16px] 
            font-semibold text-gray-700 mb-4 flex items-center"
            >
              <span className="mr-2">{reviewsList.length}</span>
              <span>{reviewsList.length > 1 ? "Đánh giá" : "Đánh giá"}</span>
            </h3>
            {reviewsList?.length > 0 ? (
              <>
                <List
                  itemLayout="vertical"
                  dataSource={currentReviews}
                  renderItem={(review) => (
                    <List.Item
                      key={review?.id}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <CommentItem comment={review} />
                    </List.Item>
                  )}
                  className="divide-y divide-gray-100"
                />
                {currentPage < totalPages && (
                  <ButtonComp
                    onClick={handleLoadMorePage}
                    title="Hiện thêm đánh giá"
                    type="secondary"
                    style="max-w-[180px] py-3 rounded-[8px] border border-[#0f172a] mt-2"
                  />
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center italic py-8 bg-gray-50 rounded-lg">
                Chưa có đánh giá nào cho khóa học này. Hãy là người đầu tiên
                đánh giá!
              </p>
            )}
          </>
        )}
      </div>
      <Modal
        title={<span className="text-red-500 font-medium">Xác nhận xóa</span>}
        open={modalVisible}
        onOk={handleDelete}
        onCancel={() => setModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ className: "bg-red-500 hover:bg-red-600" }}
      >
        <p className="text-gray-600 text-center py-3">
          Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể hoàn
          tác.
        </p>
      </Modal>
    </section>
  );
};

export default CourseReviews;
