import { useLocation } from "react-router-dom";
import Image404 from "~/assets/images/404.png";
import NavigationText from "~/components/NavigationText/NavigationText";

const NotFound = () => {
  const location = useLocation();

  return (
    <section>
      <NavigationText placeTo={location.pathname.slice(1)} />
      <div class="animate-fadeIn py-16 px-28">
        <h2 className="text-[32px] font-semibold mb-6">
          Lỗi! Không tìm thấy trang!
        </h2>
        <img
          src={Image404}
          alt="404 Illustration"
          class="mx-auto max-w-2xl max-h-[786px] object0-cover animate-[float_3s_infinite] rounded-lg"
        />
      </div>
    </section>
  );
};

export default NotFound;
