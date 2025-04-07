import { Ellipsis } from "lucide-react";
import Star from "~/components/Star/Star";
import ReviewCard from "~/pages/Profile/ReviewCard/ReviewCard";

const listReviews = [
  {
    courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
    rating: 5,
    content:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
  {
    courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
    rating: 5,
    content:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
  {
    courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
    rating: 5,
    content:
      "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
  },
];

const ListReviews = () => {
  return (
    <section className="w-full pb-[90px]">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-[24px] font-semibold">Đánh giá</h3>
        <span className="text-[18px] font-semibold">(12)</span>
      </div>

      <div className="flex flex-col gap-[16px]">
        {listReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ListReviews;
