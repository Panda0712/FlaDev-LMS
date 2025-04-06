import { useNavigate } from "react-router-dom";
import GetStartedBannerImg from "~/assets/images/started_banner.png";
import StudentImg from "~/assets/images/student.png";
import Button from "~/components/Button/Button";

const GetStartedBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative px-28 w-full min-h-[250px]">
      <img
        src={GetStartedBannerImg}
        className="object-cover w-full h-full"
        alt=""
      />
      <div className="absolute top-[55%] left-0 right-0 transform translate-y-[-50%] flex items-center justify-between px-36">
        <div className="flex items-center gap-8 pl-12">
          <div className="w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center">
            <img src={StudentImg} alt="" />
          </div>
          <p className="text-[20px] font-semibold">Bắt đầu với FlaDev ngay</p>
        </div>
        <Button title="Khám phá ngay" onClick={() => navigate("/courses")} />
      </div>
    </section>
  );
};

export default GetStartedBanner;
