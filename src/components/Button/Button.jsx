const Button = ({ title, style, onClick, type = "primary", ...props }) => {
  let buttonColor = "bg-[#3252DF]";

  switch (type) {
    case "primary":
      buttonColor = "bg-[#ff782d] text-white font-medium shadow-sm";
      break;
    case "secondary":
      buttonColor =
        "bg-transparent text-black text-[16px] shadow-none p-[24px] border-2 border-[#9d9d9d] font-semibold hover:bg-slate-100";
      break;
    case "cart":
      buttonColor =
        "bg-[#020617] text-white text-[16px] py-3 shadow-none p-[24px] font-semibold hover:opacity-80";
      break;
    case "submit":
      buttonColor = "bg-[#3252DF] text-white shadow-sm";
      break;
    case "cancel":
      buttonColor = "bg-gray-400 text-white shadow-sm";
      break;
    case "cancel-secondary":
      buttonColor = "bg-[#f5f6f8] text-[#b3b3b3] shadow-sm";
      break;
    case "warning":
      buttonColor = "text-red-500 font-medium bg-transparent";
      break;
    case "wishlist":
      buttonColor = "text-blue-500 font-medium bg-transparent";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonColor} py-2 rounded-full transition hover:opacity-90 cursor-pointer px-4 ${style}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
