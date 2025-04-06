import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { menuList } from "~/components/Navbar/constants";
import Logo from "/logo.jpg";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="relative px-28 flex items-center h-[72px] justify-between gap-28 border-b border-slate-200">
      <div className="flex items-center gap-2">
        <img src={Logo} className="w-10 h-10 object-cover" alt="" />
        <h2 className="text-[24px] font-semibold">FlaDev</h2>
      </div>
      <ul className="flex items-center">
        {menuList.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`${
              location.pathname === item.path
                ? "text-[#ff782d] bg-slate-100"
                : ""
            } font-semibold transition hover:bg-slate-100 hover:text-[#ff782d] h-[72px] flex items-center justify-center px-4`}
          >
            <h5>{item.name}</h5>
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-5">
        <Link to="/auth">
          <p className="font-semibold transition hover:opacity-80">
            Đăng nhập / Đăng ký
          </p>
        </Link>
        <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center border-2 border-[#ff782d]">
          <Search size={20} className="text-[#ff782d]" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
