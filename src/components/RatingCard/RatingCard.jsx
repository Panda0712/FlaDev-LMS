import DoubleQuotes from "~/assets/images/double-quotes.png";

const RatingCard = ({ review }) => {
  return (
    <div className="rounded-[16px] shadow-sm p-[24px] basis-[calc(33%-8px)] border-1 border-slate-200">
      <img src={DoubleQuotes} className="w-[48px] h-[48px]" alt="" />
      <p className="my-4 font-medium line-clamp-2 min-h-[50px]">
        {review.content}
      </p>
      <div className="flex items-center gap-4">
        <img src={review.userAvatar} className="w-[60px] h-[60px]" alt="" />
        <div>
          <h3 className="text-[20px] font-semibold">{review.userName}</h3>
          <p className="text-[#334155] font-medium text-[14px]">
            {review.role || "Học viên"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
