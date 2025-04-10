import { Play } from "lucide-react";

const CourseVideo = ({ thumbnail }) => {
  return (
    <div className="relative">
      <img
        src={thumbnail}
        className="w-full min-h-[450px] object-cover rounded-[16px]"
        alt=""
      />
      <div
        className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] 
  w-[100px] h-[100px] shadow-sm cursor-pointer transition hover:opacity-80 bg-white rounded-full flex items-center justify-center"
      >
        <Play size={44} className="fill-black" />
      </div>
    </div>
  );
};

export default CourseVideo;
