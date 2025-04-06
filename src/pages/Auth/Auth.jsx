import NavigationText from "~/components/NavigationText/NavigationText";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

const Auth = () => {
  return (
    <section>
      <NavigationText placeTo="Đăng nhập / Đăng ký" />
      <div className="flex gap-6 pt-8 pb-28 pl-28">
        <Login />
        <Register />
      </div>
    </section>
  );
};

export default Auth;
