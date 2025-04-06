const FileInput = ({ image, handleImageChange }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <label
        htmlFor="file_input"
        className="block mb-2 text-sm font-medium text-black dark:text-black"
      >
        Tải ảnh lên
      </label>
      <label
        htmlFor="file_input"
        className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition"
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
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
            <p className="mt-2 text-sm text-gray-800 dark:text-gray-800">
              Nhấn để chọn file hoặc kéo thả vào đây
            </p>
            <p className="text-xs text-gray-800 dark:text-gray-800">
              PNG, JPG, JPEG (tối đa 10MB)
            </p>
          </div>
        )}
        <input
          id="file_input"
          type="file"
          className="hidden"
          accept="image/"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default FileInput;
