import Star from "~/components/Star/Star";

const ReviewCard = ({ review }) => {
  return (
    <div className="rounded-[16px] border border-[#f2f8f0] p-[16px]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[18px] text-[#555555] font-medium">
          Tên khóa học:{" "}
          <span className="text-[20px] font-semibold text-black ml-1">
            {review?.courseName}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3 my-4">
        <span className="mt-1">Đánh giá: </span>
        <Star value={review?.rating} />
      </div>
      <div className="flex gap-3">
        <span>Nội dung: </span>
        <p className="max-w-[70%]">{review?.content}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
