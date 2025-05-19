import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";

const CourseVideo = ({ thumbnail, videoUrl, onVideoComplete, lessonId }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchedSegments, setWatchedSegments] = useState([]);
  const [lastPosition, setLastPosition] = useState(0);
  const playerRef = useRef(null);

  // Theo dõi sự thay đổi vị trí để phát hiện tua video
  const handleProgress = (state) => {
    const currentTime = state.playedSeconds;
    setProgress(state.played);

    // Phát hiện tua video (khi người dùng nhảy quá xa)
    if (Math.abs(currentTime - lastPosition) > 3 && lastPosition > 0) {
      // Người dùng đã tua, không cập nhật phân đoạn đã xem
      console.log("Tua video được phát hiện!");
    } else if (playing) {
      // Cập nhật phân đoạn đã xem
      updateWatchedSegments(lastPosition, currentTime);
    }

    setLastPosition(currentTime);

    // Tính toán tổng thời gian đã xem
    const watchedDuration = calculateWatchedDuration();

    // Chỉ đánh dấu hoàn thành nếu đã xem đủ 90% thời lượng video
    if (watchedDuration >= 0.9 * duration && onVideoComplete && lessonId) {
      onVideoComplete(lessonId);
    }
  };

  // Cập nhật các phân đoạn đã xem
  const updateWatchedSegments = (start, end) => {
    // Thêm phân đoạn mới
    const newSegment = [start, end];

    setWatchedSegments((prevSegments) => {
      // Sao chép mảng cũ
      const segments = [...prevSegments];

      // Thêm phân đoạn mới
      segments.push(newSegment);

      // Hợp nhất các phân đoạn chồng lấp
      return mergeOverlappingSegments(segments);
    });
  };

  // Hợp nhất các phân đoạn chồng lấp
  const mergeOverlappingSegments = (segments) => {
    if (segments.length <= 1) return segments;

    // Sắp xếp các phân đoạn theo thời điểm bắt đầu
    const sortedSegments = [...segments].sort((a, b) => a[0] - b[0]);
    const result = [sortedSegments[0]];

    for (let i = 1; i < sortedSegments.length; i++) {
      const current = sortedSegments[i];
      const lastMerged = result[result.length - 1];

      // Nếu phân đoạn hiện tại chồng lấp với phân đoạn đã hợp nhất cuối cùng
      if (current[0] <= lastMerged[1]) {
        // Mở rộng phân đoạn cuối cùng nếu cần
        lastMerged[1] = Math.max(lastMerged[1], current[1]);
      } else {
        // Thêm phân đoạn mới nếu không chồng lấp
        result.push(current);
      }
    }

    return result;
  };

  // Tính tổng thời gian đã xem từ các phân đoạn
  const calculateWatchedDuration = () => {
    return watchedSegments.reduce((total, [start, end]) => {
      return total + (end - start);
    }, 0);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  // Xử lý khi người dùng tìm kiếm/tua video
  const handleSeek = (seconds) => {
    console.log("Video được tua đến:", seconds);
    // Ở đây ta chỉ ghi nhận sự kiện, không cập nhật phân đoạn
  };

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setWatchedSegments([]);
    setLastPosition(0);
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
            onSeek={handleSeek}
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
