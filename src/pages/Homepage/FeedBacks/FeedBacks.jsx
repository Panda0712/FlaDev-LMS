import RatingCard from "~/components/RatingCard/RatingCard";

const FeedBacks = ({ reviews }) => {
  return (
    <section className="my-[45px] lg:px-28 md:px-24 sm:px-18 px-12">
      <div className="text-center leading-[1.7] mb-[50px]">
        <h2
          className="lg:text-[32px] md:text-[28px]
        text-[24px] font-bold"
        >
          Đánh giá của học viên
        </h2>
        <p
          className="md:text-[18px] text-[16px]
        font-medium text-[#555555]"
        >
          Học viên nói gì về FlaDev
        </p>
      </div>

      <div className="flex flex-wrap max-[900px]:flex-col items-center gap-[16px]">
        {reviews?.slice(0, 3).map((review) => (
          <RatingCard key={review?.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default FeedBacks;
