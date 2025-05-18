// Một vài biểu thức chính quy - Regular Expression và custom message.
// Về Regular Expression khá hại não: https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY
export const FIELD_REQUIRED_MESSAGE = "Bắt buộc nhập trường này";
export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = "Email sai định dạng. (example@gmail.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
  "Mật khẩu phải bao gồm tối thiểu 1 ký tự chữ, 1 chữ số, và tối thiểu 8 ký tự.";
export const PASSWORD_CONFIRMATION_MESSAGE = "Mật khẩu nhập lại không đúng!!";
export const PHONE_RULE =
  /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
export const PHONE_RULE_MESSAGE =
  "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng!";

// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 10485760; // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return "File không được để trống";
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return "Quá giới hạn dung lượng file. (10MB)";
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return "File không hỗ trợ. Chỉ chấp nhận jpg, jpeg and png";
  }
  return null;
};

export const LIMIT_VIDEO_FILE_SIZE = 262144000; // byte = 250 MB
export const ALLOW_VIDEO_FILE_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/avi",
  "video/mov",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-msvideo",
];
export const singleVideoValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return "File video không được để trống";
  }

  if (file.size > LIMIT_VIDEO_FILE_SIZE) {
    return "Quá giới hạn dung lượng file video. (100MB)";
  }

  if (!ALLOW_VIDEO_FILE_TYPES.includes(file.type)) {
    return "File video không hỗ trợ. Chỉ chấp nhận mp4, webm, ogg, avi, mov, wmv";
  }

  return null;
};

export const multipleVideoValidator = (files, maxFiles = 5) => {
  if (!files || files.length === 0) {
    return "Vui lòng chọn ít nhất 1 file video";
  }

  if (files.length > maxFiles) {
    return `Chỉ được phép upload tối đa ${maxFiles} video`;
  }

  // Kiểm tra từng file
  for (let i = 0; i < files.length; i++) {
    const error = singleVideoValidator(files[i]);
    if (error) {
      return `Video ${i + 1}: ${error}`;
    }
  }

  return null;
};

// Validator cho duration video (nếu cần)
export const videoWithDurationValidator = (file, maxDuration = 600) => {
  // Kiểm tra file trước
  const fileError = singleVideoValidator(file);
  if (fileError) return fileError;

  // Kiểm tra duration - cần thực hiện async
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);

    video.src = url;
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);

      if (video.duration > maxDuration) {
        resolve(`Video quá dài. Tối đa ${maxDuration / 60} phút`);
      } else {
        resolve(null);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve("Không thể đọc thông tin video");
    };
  });
};
