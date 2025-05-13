import FileInputV2 from "~/components/FileInputV2/FileInputV2";
import VideoInputV2 from "~/components/VideoInputV2/VideoInputV2";

const InputV2 = ({
  name,
  content,
  type = "text",
  style,
  video = null,
  videos = [],
  image = null,
  images = [],
  handleImageChange = () => {},
  handleVideoChange = () => {},
  multiple = false,
  loginStyle = false,
  inputId = "video_input",
  ...props
}) => {
  const { error } = props;

  const globalStyle =
    "bg-[#F2F0F2] text-[16px] text-[#49735A] rounded-[12px] px-4 h-[50px] my-2 sm:w-[400px] w-[350px]";

  if (multiple) {
    return (
      <FileInputV2
        images={images}
        handleImageChange={handleImageChange}
        multiple={multiple}
        style={style}
        {...props}
      />
    );
  }

  if (type === "file") {
    return (
      <FileInputV2
        image={image}
        handleImageChange={handleImageChange}
        multiple={multiple}
        style={style}
        {...props}
      />
    );
  }

  if (type === "video") {
    return (
      <VideoInputV2
        video={video}
        videos={videos}
        handleVideoChange={handleVideoChange}
        multiple={multiple}
        style={style}
        inputId={inputId}
        {...props}
      />
    );
  }

  if (type === "textarea") {
    return (
      <>
        <textarea
          name={name}
          placeholder={content}
          type={type}
          className={`${globalStyle} h-[96px] ${style}`}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-left max-w-[300px] text-[14px] my-1">
            {error.message}
          </p>
        )}
      </>
    );
  }

  return (
    <div className={`w-full flex flex-col ${loginStyle && "items-center"}`}>
      <input
        name={name}
        placeholder={content}
        type={type}
        className={`${globalStyle} ${style}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-left max-w-[300px] text-[14px] my-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputV2;
