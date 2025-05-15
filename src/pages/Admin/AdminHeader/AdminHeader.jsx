import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "~/apis/endpoints";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import { logout as logoutRedux } from "~/redux/authSlice";

const AdminHeader = () => {
  const [openAdminProfile, setOpenAdminProfile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const dispatch = useDispatch();

  const handleToggleOpenAdminProfile = () =>
    setOpenAdminProfile(!openAdminProfile);

  const handleLogout = () => {
    toast
      .promise(logout(), {
        pending: "Đang đăng xuất",
      })
      .then(() => {
        setOpenModal(false);
        dispatch(logoutRedux());
        toast.success("Đăng xuất thành công");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setOpenModal(false));
  };

  const handleCloseModal = () => setOpenModal(false);

  const profileItemStyle =
    "cursor-pointer transition text-center hover:opacity-75 text-[16px] border border-b-1 border-gray-300 border-x-0 py-1 border-t-0";

  return (
    <div className="flex items-center justify-between p-[24px] bg-white shadow-sm">
      <h1 className="font-medium lg:text-[24px] md:text-[20px] sm:text-[18px] text-[16px]">
        Quản trị <span className="text-blue-600">Fla</span>Dev.
      </h1>
      <div
        onClick={handleToggleOpenAdminProfile}
        className="relative flex sm:flex-nowrap flex-wrap 
        items-center gap-2 cursor-pointer transition hover:bg-slate-200 p-2 rounded-sm"
      >
        <img
          src="https://static1.personalitydatabase.net/2/pdb-images-prod/3fda573a/profile_images/fa6d2cd57fde44adaf9c8ffa0f161079.png"
          className="md:w-[45px] md:h-[45px] sm:w-[40px] sm:h-[40px] w-[35px] h-[35px] object-cover"
          alt=""
        />

        <div className="relative md:text-[18px] sm:text-[16px] text-[14px] font-semibold text-[#555555]">
          <p>{/* {capitalizeWords(currentUser?.displayName)} */} Admin</p>
          <h6 className="sm:text-[14px] text-[12px] font-medium text-[#6f767e]">
            {/* Super {currentUser?.role} */} Admin
          </h6>
        </div>

        {openAdminProfile && (
          <ul className="absolute z-99 shadow-sm bottom-[-100px] rounded-lg bg-gray-200 right-0 py-3 px-4 w-[180px]">
            <Link to="/admin/profile">
              <li className={profileItemStyle}>Thông tin cá nhân</li>
            </Link>
            <li
              onClick={() => setOpenModal(true)}
              className={`${profileItemStyle} border-b-0`}
            >
              Đăng xuất
            </li>
          </ul>
        )}

        {openModal && (
          <Modal handleCloseModal={handleCloseModal} title="Xác nhận">
            <div className="mt-6 relative">
              <p className="text-black">
                Bạn có chắc chắn muốn đăng xuất không?
              </p>

              <div className="flex justify-end">
                <div className="flex items-center gap-2 mt-8">
                  <Button
                    title="Trở lại"
                    type="cancel"
                    onClick={handleCloseModal}
                  />
                  <Button
                    title="Đăng xuất"
                    type="warning"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
