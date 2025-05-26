import DoubleQuotes from "~/assets/images/double-quotes.png";

const RatingCard = ({ review }) => {
  return (
    <div
      className="rounded-[16px] shadow-sm p-[24px] max-[900px]:w-full 
    basis-[calc(33%-8px)] border-1 border-slate-200"
    >
      <img
        src={DoubleQuotes}
        className="lg:w-[48px] lg:h-[48px] md:w-[36px] md:h-[36px] 
        sm:w-[24px] sm:h-[24px] w-[20px] h-[20px]"
        alt=""
      />
      <p className="my-4 font-medium line-clamp-2 min-h-[50px]">
        {review.content}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <img
          src={review.userAvatar}
          className="md:w-[60px] md:h-[60px] sm:w-[50px] 
          sm:h-[50px] w-[40px] h-[40px]"
          alt=""
        />
        <div>
          <h3 className="md:text-[20px] text-[18px] font-semibold">
            {review.userName}
          </h3>
          <p className="text-[#334155] font-medium text-[14px]">
            {review.role || "Học viên"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
