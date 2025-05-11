import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import { loginFailure, loginStart, loginSuccess } from "~/redux/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputStyle =
    "w-full px-4 py-2 border border-[#9d9d9d] rounded-md font-medium focus:outline-none focus:ring-1 focus:ring-slate-200";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    dispatch(loginStart());

    try {
      const response = await register({
        username: name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.access_token,
        })
      );

      navigate("/auth/login");
      toast.success("Đăng ký tài khoản thành công!!!");
    } catch (err) {
      const errorMsg = err.response?.data?.errors || "Registration failed";
      setError(errorMsg);
      toast.error(errorMsg);
      dispatch(loginFailure(errorMsg));
    }
  };

  return (
    <div className="basis-[calc(50%-12px)] mt-8 p-7 bg-white rounded-2xl border border-slate-200">
      <h2 className="text-[32px] font-semibold mb-6">Đăng ký</h2>

      {error && (
        <div className="mb-4 text-red-500">
          {typeof error === "string" ? error : Object.values(error).join(" ")}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên người dùng*"
            className={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            type="password"
            placeholder="Mật khẩu*"
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            👁️
          </span>
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu*"
            className={inputStyle}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            👁️
          </span>
        </div>

        <Button
          title="Đăng ký"
          style="w-full font-light py-3 shadow-none"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Register;
