import RatingCard from "~/components/RatingCard/RatingCard";

const FeedBacks = ({ reviews }) => {
  return (
    <section className="my-[45px] px-28">
      <div className="text-center leading-[1.7] mb-[50px]">
        <h2 className="text-[32px] font-bold">Đánh giá của học viên</h2>
        <p className="text-[18px] font-medium text-[#555555]">
          Học viên nói gì về FlaDev
        </p>
      </div>

      <div className="flex items-center gap-[16px]">
        {reviews?.slice(0, 3).map((review) => (
          <RatingCard key={review?.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default FeedBacks;
