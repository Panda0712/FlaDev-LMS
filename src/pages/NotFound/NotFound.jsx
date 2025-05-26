import { useLocation } from "react-router-dom";
import Image404 from "~/assets/images/404.png";
import NavigationText from "~/components/NavigationText/NavigationText";

const NotFound = () => {
  const location = useLocation();

  return (
    <section>
      <NavigationText placeTo={location.pathname.slice(1)} />
      <div
        class="animate-fadeIn py-16 lg:px-28 
      md:px-24 sm:px-18 px-12"
      >
        <h2
          className="lg:text-[32px] md:text-[28px] 
        text-[24px] font-semibold mb-6"
        >
          Lỗi! Không tìm thấy trang!
        </h2>
        <img
          src={Image404}
          alt="404 Illustration"
          class="lg:mx-auto lg:max-w-2xl max-w-full max-h-[786px] 
          object-cover animate-[float_3s_infinite] rounded-lg"
        />
      </div>
    </section>
  );
};

export default NotFound;
