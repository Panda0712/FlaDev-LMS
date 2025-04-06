import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import Image404 from "~/assets/images/404.png";

const NotFound = () => {
  const location = useLocation();

  return (
    <section>
      <div className="h-[60px] bg-[#f5f5f5] pl-28 flex items-center gap-2">
        <span className="text-[#555555] font-medium">Trang chủ</span>
        <span>
          <ChevronRight size={14} className="text-[#9d9d9d]" />
        </span>
        <span className="text-[#9d9d9d]">{location.pathname.slice(1)}</span>
      </div>
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
