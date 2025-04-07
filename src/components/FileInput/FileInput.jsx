import PrevImg from "~/assets/images/preview-img.png";

const FileInput = ({ image, handleImageChange, type }) => {
  return (
    <div className="w-full max-w-[425px] h-[255px]">
      {type !== "file-secondary" && (
        <label
          htmlFor="file_input"
          className="block mb-2 text-sm font-medium text-black dark:text-black"
        >
          Tải ảnh lên
        </label>
      )}
      <label
        htmlFor="file_input"
        className="flex items-center 
        justify-center w-full h-[255px] border-1 
        border-gray-300 rounded-[16px] p-[16px]
        cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 transition"
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <img src={PrevImg} className="w-full h-full rounded-[8px]" />
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
