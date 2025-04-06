import { ChevronRight } from "lucide-react";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

const Auth = () => {
  return (
    <section>
      <div className="h-[60px] bg-[#f5f5f5] pl-28 flex items-center gap-2">
        <span className="text-[#555555] font-medium">Trang chủ</span>
        <span>
          <ChevronRight size={14} className="text-[#9d9d9d]" />
        </span>
        <span className="text-[#9d9d9d]">Đăng nhập / Đăng ký</span>
      </div>
      <div className="flex gap-6 pt-8 pb-28 pl-28">
        <Login />
        <Register />
      </div>
    </section>
  );
};

export default Auth;
