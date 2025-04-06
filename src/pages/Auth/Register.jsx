import Button from "~/components/Button/Button";

const Register = () => {
  const inputStyle =
    "w-full px-4 py-2 border border-[#9d9d9d] rounded-md font-medium focus:outline-none focus:ring-1 focus:ring-slate-200";

  return (
    <div className="basis-[calc(50%-12px)] mt-8 p-7 bg-white rounded-2xl border border-slate-200">
      <h2 className="text-[32px] font-semibold mb-6">Đăng ký</h2>

      <form>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email hoặc tên người dùng*"
            className={inputStyle}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên người dùng*"
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
          </span>
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu*"
            className={inputStyle}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            👁️
          </span>
        </div>

        <Button title="Đăng ký" style="w-full font-light py-3 shadow-none" />
      </form>
    </div>
  );
};

export default Register;
