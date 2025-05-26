import { useLocation } from "react-router-dom";
import NavigationText from "~/components/NavigationText/NavigationText";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

const Auth = () => {
  const location = useLocation();

  const isLogin = location.pathname === "/auth/login";
  const isRegister = location.pathname === "/auth/register";

  return (
    <section>
      <NavigationText placeTo="Đăng nhập / Đăng ký" />
      <div className="flex justify-center items-center gap-6 pt-8 pb-28">
        {isLogin && <Login />}
        {isRegister && <Register />}
      </div>
    </section>
  );
};

export default Auth;
