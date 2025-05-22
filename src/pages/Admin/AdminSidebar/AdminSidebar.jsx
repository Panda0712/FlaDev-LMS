import {
  Bell,
  FileUser,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  PencilLine,
  Sheet,
  TicketPercent,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { menuAdminList } from "~/pages/Admin/AdminSidebar/constants";
import MeoLogo from "/logo.jpg";

const iconMap = {
  contact: <FileUser size={24} />,
  courses: <GraduationCap size={24} />,
  dashboard: <LayoutDashboard size={24} />,
  orders: <Sheet size={24} />,
  voucher: <TicketPercent size={24} />,
  notification: <Bell />,
  review: <MessageCircle size={24} />,
  blog: <PencilLine size={24} />,
};

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div
      className="relative lg:basis-[20%] basis-[100%] lg:h-screen 
      h-auto overflow-auto bg-[#07275a] flex 
      flex-col items-center py-[20px]"
    >
      <Link to="/admin">
        <div className="flex items-center gap-2 mb-10">
          <img src={MeoLogo} className="object-cover w-12 h-12" alt="" />
          <h1 className="font-medium md:text-[24px] sm:text-[20px] text-[18px] text-white">
            <span className="text-blue-600">Fla</span>Dev.
          </h1>
        </div>
      </Link>

      <div
        className="flex lg:flex-col items-center
         flex-row lg:overflow-unset overflow-auto lg:gap-6 gap-0 text-white w-full custom-scrollbar"
      >
        {menuAdminList.map((menu) => (
          <Link to={menu.path} key={menu?.name} className="w-full">
            <div
              className={`${
                location.pathname === menu.path ? "bg-blue-400" : ""
              } lg:border-y-[0.5px] border-r-[0.5px] lg:min-w-auto min-w-[200px] w-full border-slate-100 
                flex items-center justify-center gap-2 px-[16px] py-[24px] transition hover:bg-blue-400`}
            >
              {iconMap[menu.type]}
              <span className="md:text-[16px] text-[14px] font-medium text-center">
                {menu.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="md:text-[16px] text-[14px] text-white">
          Bản quyền thuộc về{" "}
          <span className="text-blue-600 font-medium">Fla</span>Dev.
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
