import FileInput from "~/components/FileInput/FileInput";

const Input = ({
  name,
  content,
  type = "text",
  style,
  image = null,
  handleImageChange = () => {},
  ...props
}) => {
  const { error } = props;

  const globalStyle =
    "text-[16px] border border-slate-400 rounded-[12px] px-4 py-4 my-2 font-medium";

  if (type === "file") {
    return <FileInput image={image} handleImageChange={handleImageChange} />;
  }

  if (type === "textarea") {
    return (
      <textarea
        name={name}
        placeholder={content}
        type={type}
        className={`${globalStyle} h-[110px] ${style}`}
        {...props}
      />
    );
  }

  return (
    <>
      <input
        name={name}
        placeholder={content}
        type={type}
        className={`${globalStyle} h-[50px] ${style}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-left max-w-[300px] text-[14px] my-1">
          {error.message}
        </p>
      )}
    </>
  );
};

export default Input;
