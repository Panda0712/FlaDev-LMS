import { ChevronRight } from "lucide-react";

const NavigationText = ({ placeTo }) => {
  return (
    <div className="h-[60px] bg-[#f5f5f5] lg:pl-28 md:pl-20 pl-12 flex items-center gap-2">
      <span className="text-[#555555] font-medium">Trang chủ</span>
      <span>
        <ChevronRight size={14} className="text-[#9d9d9d]" />
      </span>
      <span className="text-[#9d9d9d]">{placeTo}</span>
    </div>
  );
};

export default NavigationText;
