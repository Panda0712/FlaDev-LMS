import { useNavigate } from "react-router-dom";
import CheckImg from "~/assets/images/check.png";
import ExploreImg from "~/assets/images/explore.png";
import Button from "~/components/Button/Button";
import { info } from "~/pages/Homepage/Explore/constants";

const Explore = () => {
  const navigate = useNavigate();

  return (
    <section
      className="lg:px-28 md:px-24 sm:px-18 px-12
    my-[90px] flex items-center max-[1150px]:flex-wrap max-[1150px]:gap-8 
    gap-5 justify-between"
    >
      <img
        src={ExploreImg}
        alt=""
        className="object-cover max-lg:min-w-[70%] 
        max-md:min-w-[60%] max-sm:min-w-[60%] min-w-[50%]"
      />

      <div>
        <h3
          className="lg:text-[32px] md:text-[28px] text-[24px] 
        font-bold max-w-[400px] mb-5"
        >
          Nâng cao kỹ năng với đội ngũ FlaDev
        </h3>

        <p className="text-[#555555] font-medium max-w-[520px] mb-4">
          Đội ngũ giảng viên nhiệt huyết, tài năng hứa hẹn mang đến nguồn kiến
          thức vô hạn trong ngành lập trình.
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {info.map((item) => (
            <div key={item.content} className="flex items-center gap-2">
              <img src={CheckImg} className="w-[16px] h-[16px]" alt="" />
              <p className="text-[16px] font-medium">{item.content}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={() => navigate("/courses")}
          title="Khám phá khóa học"
        />
      </div>
    </section>
  );
};

export default Explore;
