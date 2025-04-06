import DoubleQuotes from "~/assets/images/double-quotes.png";
import ExampleAvatar from "~/assets/images/example-avatar.png";

const studentRating = {
  content:
    "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.",
  avatar: ExampleAvatar,
  name: "John Doe",
  role: "Software Engineer",
};

const RatingCard = () => {
  return (
    <div className="rounded-[16px] shadow-sm p-[24px] basis-[calc(33%-8px)] border-1 border-slate-200">
      <img src={DoubleQuotes} className="w-[48px] h-[48px]" alt="" />
      <p className="my-4 font-medium">{studentRating.content}</p>
      <div className="flex items-center gap-4">
        <img src={studentRating.avatar} className="w-[60px] h-[60px]" alt="" />
        <div>
          <h3 className="text-[20px] font-semibold">{studentRating.name}</h3>
          <p className="text-[#334155] font-medium text-[14px]">
            {studentRating.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
