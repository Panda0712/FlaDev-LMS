import React from "react";

const VideoInputV2 = ({
  video = null,
  videos = [],
  handleVideoChange,
  multiple = false,
  style,
  inputId,
}) => {
  return (
    <div className={`w-full ${style}`}>
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-black dark:text-black"
      >
        Tải video lên
      </label>
      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg \
        cursor-pointer bg-gray-50 dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-300 \
        focus-within:ring-2 focus-within:ring-blue-500 transition"
      >
        {video ? (
          <video
            src={video}
            controls
            className="w-[90%] h-28 object-cover rounded-lg"
          />
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 p-2 w-full">
            {videos.map((vid, idx) => (
              <div
                key={idx}
                className="relative w-[90%] aspect-video overflow-hidden rounded-lg border border-gray-300"
              >
                <video
                  src={vid}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-900 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V17a4 4 0 004 4h10a4 4 0 004-4v-.5M16 16l-4-4m0 0l-4 4m4-4v12"
              ></path>
            </svg>
            <p className="mt-2 text-sm text-gray-800 text-center dark:text-gray-800">
              Nhấn để chọn file hoặc kéo thả vào đây
            </p>
            <p className="text-xs text-gray-800 text-center dark:text-gray-800">
              MP4, WEBM, OGG (tối đa 100MB)
            </p>
          </div>
        )}
        <input
          id={inputId}
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleVideoChange}
          multiple={multiple}
        />
      </label>
    </div>
  );
};

export default VideoInputV2;
