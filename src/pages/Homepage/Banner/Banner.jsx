import { useNavigate } from "react-router-dom";
import BannerImg from "~/assets/images/banner.png";
import Button from "~/components/Button/Button";
import { capitalizeWords } from "~/utils/formatters";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative max-[900px]:min-h-[330px]">
      <img
        src={BannerImg}
        className="max-[900px]:min-h-[330px] max-[900px]:object-cover max-[800px]:opacity-50"
        alt=""
      />
      <div
        className="absolute max-w-[520px] top-[50%] lg:pl-28 
      md:pl-20 sm:pl-12 pl-6 max-sm:pr-6 transform translate-y-[-50%]"
      >
        <h2
          className="font-bold lg:text-[40px] md:text-[32px] 
        max-md:max-w-[300px] sm:text-[24px] text-[20px]"
        >
          {capitalizeWords("Xây dựng kĩ năng với các khóa học trực tuyến")}
        </h2>
        <p className="md:text-[16px] max-[800px]:max-w-[300px] text-[14px] text-[#555555] mt-7 mb-5">
          Trải nghiệm các khóa học thú vị và tạo nên sự nghiệp vững chắc cho
          tương lai một lập trình viên thực thụ.
        </p>
        <Button onClick={() => navigate("/courses")} title="Ghi danh ngay" />
      </div>
    </div>
  );
};

export default Banner;
