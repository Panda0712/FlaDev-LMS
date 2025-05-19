import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";

const CourseVideo = ({
  thumbnail,
  videoUrl,
  onVideoComplete,
  lessonId,
  handleDuration,
}) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    if (state.played > 0.9 && onVideoComplete && lessonId) {
      onVideoComplete(lessonId);
    }
  };

  useEffect(() => {
    setPlaying(false);
  }, [videoUrl]);

  return (
    <div className="relative rounded-[16px] overflow-hidden">
      {videoUrl ? (
        <div className="player-wrapper">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            width="100%"
            height="450px"
            playing={playing}
            controls={true}
            onProgress={handleProgress}
            onDuration={handleDuration}
            progressInterval={1000}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                },
              },
            }}
            style={{ borderRadius: "16px" }}
          />
        </div>
      ) : (
        <>
          <img
            src={thumbnail}
            className="w-full min-h-[450px] object-cover rounded-[16px]"
            alt=""
          />
          <div
            onClick={handlePlayPause}
            className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] 
              w-[100px] h-[100px] shadow-sm cursor-pointer transition hover:opacity-80 bg-white rounded-full flex items-center justify-center"
          >
            <Play size={44} className="fill-black" />
          </div>
        </>
      )}
    </div>
  );
};

export default CourseVideo;
