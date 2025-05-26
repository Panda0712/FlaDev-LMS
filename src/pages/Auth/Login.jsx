import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import { loginFailure, loginStart, loginSuccess } from "~/redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputStyle =
    "w-full px-4 py-2 border border-[#9d9d9d] rounded-md font-medium focus:outline-none focus:ring-1 focus:ring-slate-200";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    toast
      .promise(login({ email, password }), {
        pending: "Đang đăng nhập...",
      })
      .then((res) => {
        navigate("/");
        dispatch(
          loginSuccess({
            user: res.user,
            token: res.access_token,
          })
        );
        toast.success("Đăng nhập thành công!");
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Login failed";
        setError(errorMsg);
        toast.error(errorMsg);
        dispatch(loginFailure(errorMsg));
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="lg:basis-[calc(50%-12px)] md:basis-[calc(70%-12px)] basis-[calc(90%-12px)] 
    mt-8 p-7 bg-white rounded-2xl border border-slate-200"
    >
      <h2 className="lg:text-[32px] md:text-[28px] text-[24px] font-semibold mb-6">
        Đăng nhập
      </h2>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email hoặc tên người dùng*"
            className={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu*"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer select-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="my-5 flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="mr-2 border-2 border-[#555555]"
          />
          <label
            htmlFor="remember"
            className="md:text-md text-sm text-[#555555] font-medium"
          >
            Ghi nhớ tài khoản
          </label>
        </div>

        <Button
          title="Đăng nhập"
          style="w-full font-light py-3 shadow-none"
          type="submit"
        />

        <p className="pt-5">
          Chưa có tài khoản? <Link to="/auth/register">Đăng ký ngay</Link>
        </p>

        <p
          className="mt-7 text-md md:text-[16px] text-[14px] 
        font-medium cursor-pointer hover:underline"
        >
          Quên mật khẩu?
        </p>
      </form>
    </div>
  );
};

export default Login;
