import { Share2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoUser from "/none-user.webp";
import { profileInfo } from "~/pages/Profile/ProfileGeneral/constants";

const ProfileGeneral = () => {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className="rounded-[16px] bg-[#f8fafc] w-[290px] max-sm:w-full max-sm:mb-5">
      <div className="p-[24px] flex flex-col items-center justify-center border-b border-slate-300 pb-[32px]">
        <img
          src={currentUser?.avatar || NoUser}
          className="md:w-[160px] md:h-[160px] sm:w-[120px] sm:h-[120px] w-[100px] h-[100px]
           object-cover rounded-full border border-gray-300"
          alt=""
        />
        <h3 className="md:text-[24px] text-[20px] font-semibold my-6">
          {currentUser?.username}
        </h3>
        <div
          className="bg-white rounded-[8px] min-w-[164px] h-[48px] flex items-center p-[6px] gap-3 
        justify-center cursor-pointer transition hover:opacity-80"
        >
          <span className="md:text-[18px] text-[16px] font-medium">
            Chia sẻ
          </span>
          <Share2 size={24} />
        </div>
      </div>
      <div className="pt-[16px] flex flex-col">
        {profileInfo.map((item, index) => (
          <Link to={item.path} key={item.name}>
            <div
              className={`${
                location.pathname === item.path
                  ? "bg-black text-white"
                  : "text-[#334155]"
              } ${
                index < profileInfo.length - 1
                  ? "border-b border-slate-300"
                  : "rounded-bl-[16px] rounded-br-[16px]"
              } p-[16px] cursor-pointer transition hover:bg-black hover:text-white`}
            >
              <p className="md:text-[16px] max-sm:text-center text-[14px]">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileGeneral;
