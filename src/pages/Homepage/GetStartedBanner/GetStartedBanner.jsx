import { useNavigate } from "react-router-dom";
import GetStartedBannerImg from "~/assets/images/started_banner.png";
import StudentImg from "~/assets/images/student.png";
import Button from "~/components/Button/Button";

const GetStartedBanner = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative lg:px-28 md:px-24 sm:px-16 px-8 py-[90px] my-[45px] w-full 
    min-h-[250px] rounded-md overflow-hidden"
    >
      <img
        src={GetStartedBannerImg}
        className="object-cover w-full h-full min-h-[250px] rounded-md"
        alt=""
      />
      <div
        className="absolute top-[50%] left-0 right-0 transform translate-y-[-50%]
      flex items-center max-[890px]:justify-center 
      justify-between gap-8 lg:flex-nowrap flex-wrap lg:px-36 md:px-32 sm:px-16 px-8"
      >
        <div className="flex flex-wrap justify-center max-[650px]:justify-start items-center gap-8 pl-12">
          <div
            className="lg:w-[120px] lg:h-[120px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]
          bg-white rounded-full flex items-center justify-center"
          >
            <img
              src={StudentImg}
              className="lg:w-[70px] lg:h-[70px] md:w-[50px] md:h-[50px] w-[40px] h-[40px]"
              alt=""
            />
          </div>
          <p className="md:text-[20px] text-[18px] font-semibold">
            Bắt đầu với FlaDev ngay
          </p>
        </div>
        <Button title="Khám phá ngay" onClick={() => navigate("/courses")} />
      </div>
    </section>
  );
};

export default GetStartedBanner;
