import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import { capitalizeWords } from "~/utils/formatters";
import NoUser from "/none-user.webp";
import { logout as logoutRedux } from "~/redux/authSlice";
import { logout } from "~/apis/endpoints";

const UserProfile = ({ currentUser }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const toggleOpenProfile = () => setOpenProfile(!openProfile);

  const handleLogout = () => {
    toast
      .promise(logout(), {
        pending: "Đang đăng xuất",
      })
      .then(() => {
        setOpenModal(false);
        dispatch(logoutRedux());
        toast.success("Đăng xuất thành công");
      });
  };

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  const profileItemStyle =
    "cursor-pointer transition hover:opacity-75 text-[16px] border border-b-1 border-gray-300 border-x-0 py-1 border-t-0";

  return (
    <section
      onClick={toggleOpenProfile}
      className="relative flex group items-center gap-3 cursor-pointer"
    >
      <div
        className="flex items-center justify-center w-8 h-8 transition 
      hover:opacity-90 border-[2px] border-blue-400 rounded-full overflow-hidden"
      >
        <img
          src={currentUser?.avatar || NoUser}
          className="w-full h-full"
          alt=""
        />
      </div>
      <div>
        <p className="font-semibold leading-[1.2]">
          {capitalizeWords(currentUser?.username)}
        </p>
        <h5 className="text-sm text-gray-400">{currentUser?.email}</h5>
      </div>

      <div
        className={`absolute z-100 shadow-sm bg-gray-200 py-1 px-2 rounded-lg bottom-[-35px] 
          left-0 group-hover:block opacity-0 transition-opacity ${
            !openProfile && "group-hover:opacity-100 duration-200"
          } `}
      >
        <p className="text-[13px]">Tài khoản</p>
      </div>

      {openProfile && (
        <ul className="absolute z-99 shadow-sm bottom-[-110px] rounded-lg bg-gray-200 left-0 py-3 px-4">
          <Link to="/profile" className={profileItemStyle}>
            <li>Thông tin cá nhân</li>
          </Link>
          <li onClick={() => setOpenModal(true)} className={profileItemStyle}>
            Đăng xuất
          </li>
        </ul>
      )}

      {openModal && (
        <Modal handleCloseModal={handleCloseModal} title="Xác nhận">
          <div className="mt-6 relative">
            <p className="text-black">Bạn có chắc chắn muốn đăng xuất không?</p>

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
    </section>
  );
};

export default UserProfile;
