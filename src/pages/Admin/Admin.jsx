import { Outlet } from "react-router-dom";
import AdminHeader from "~/pages/Admin/AdminHeader/AdminHeader";
import AdminSidebar from "~/pages/Admin/AdminSidebar/AdminSidebar";

const Admin = () => {
  return (
    <section className="flex lg:flex-row flex-col overflow-hidden lg:h-screen h-auto">
      <AdminSidebar />

      <div className="flex flex-col bg-[#f0f7ff] basis-[80%]">
        <AdminHeader />
        <div className="p-[24px] overflow-auto">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Admin;
