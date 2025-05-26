/* eslint-disable react-hooks/exhaustive-deps */
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuList } from "~/components/Navbar/constants";
import Notifications from "~/components/Notifications/Notifications";
import UserProfile from "~/components/UserProfile/UserProfile";
import useCart from "~/hooks/useCart";
import Logo from "/logo.jpg";

const Navbar = () => {
  const { carts, setCarts } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  const isOrderComplete = location.pathname === "/order/complete";
  const user = useSelector((state) => state.auth.user);
  const cartRedux = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (!cartRedux.length && isOrderComplete) {
      setCarts([]);
    }
  }, [isOrderComplete]);

  return (
    <nav
      className="relative px-8 flex items-center lg:flex-nowrap flex-wrap 
    lg:h-[72px] h-auto lg:pb-0 pb-8 max-[598px]:pt-4 lg:justify-between justify-center 
    lg:gap-4 gap-8 border-b border-slate-200"
    >
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
      <div className="flex max-sm:flex-col items-center gap-5">
        <div className="flex items-center gap-5 max-sm:mb-4">
          {user && <Notifications />}
          {user && (
            <div
              onClick={() => navigate("/cart")}
              className="relative flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart size={24} />
              <div
                className="rounded-full absolute right-[-12px] top-[-9px]
              border p-2 w-[18px] h-[18px] bg-amber-100 border-slate-300 
            flex items-center justify-center"
              >
                <span className="text-[10px]">
                  {!!cartRedux.length && isOrderComplete
                    ? 0
                    : cartRedux?.length || carts?.length}
                </span>
              </div>
            </div>
          )}
          {user && (
            <div
              onClick={() => navigate("/wishlist")}
              className="relative flex items-center justify-center cursor-pointer ml-6 mr-12"
            >
              <Heart size={24} />
            </div>
          )}
        </div>
        {!user && (
          <>
            <Link to="/auth">
              <p className="font-semibold transition hover:opacity-80">
                Đăng nhập / Đăng ký
              </p>
            </Link>
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center border-2 border-[#ff782d]">
              <Search size={20} className="text-[#ff782d]" />
            </div>
          </>
        )}
        {user && <UserProfile currentUser={user} />}
      </div>
    </nav>
  );
};

export default Navbar;
