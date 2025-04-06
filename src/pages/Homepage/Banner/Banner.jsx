import BannerImg from "~/assets/images/banner.png";
import Button from "~/components/Button/Button";
import { capitalizeWords } from "~/utils/formatters";

const Banner = () => {
  return (
    <div className="relative">
      <img src={BannerImg} alt="" />
      <div className="absolute max-w-[520px] top-[50%] pl-28 transform translate-y-[-50%]">
        <h2 className="font-bold text-[40px]">
          {capitalizeWords("Xây dựng kĩ năng với các khóa học trực tuyến")}
        </h2>
        <p className="text-[16px] text-[#555555] mt-7 mb-5">
          Trải nghiệm các khóa học thú vị và tạo nên sự nghiệp vững chắc cho
          tương lai một lập trình viên thực thụ.
        </p>
        <Button title="Ghi danh ngay" />
      </div>
    </div>
  );
};

export default Banner;
