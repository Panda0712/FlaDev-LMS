import Button from "~/components/Button/Button";

const Login = () => {
  const inputStyle =
    "w-full px-4 py-2 border border-[#9d9d9d] rounded-md font-medium focus:outline-none focus:ring-1 focus:ring-slate-200";

  return (
    <div className="basis-[calc(50%-12px)] mt-8 p-7 bg-white rounded-2xl border border-slate-200">
      <h2 className="text-[32px] font-semibold mb-6">Đăng nhập</h2>

      <form>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email hoặc tên người dùng*"
            className={inputStyle}
          />
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            placeholder="Mật khẩu*"
            className={inputStyle}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            👁️
            {/* Bạn có thể thay thế icon này bằng một icon từ thư viện như Heroicons */}
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
            className="text-md text-[#555555] font-medium"
          >
            Ghi nhớ tài khoản
          </label>
        </div>

        <Button title="Đăng nhập" style="w-full font-light py-3 shadow-none" />

        <p className="mt-7 text-md text-[16px] font-medium cursor-pointer hover:underline">
          Quên mật khẩu?
        </p>
      </form>
    </div>
  );
};

export default Login;
