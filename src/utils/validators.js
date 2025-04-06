// Một vài biểu thức chính quy - Regular Expression và custom message.
// Về Regular Expression khá hại não: https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY
export const FIELD_REQUIRED_MESSAGE = "Bắt buộc nhập trường này";
export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = "Email sai định dạng. (example@gmail.com)";
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE =
  "Mật khẩu phải bao gồm tối thiểu 1 ký tự chữ, 1 chữ số, và tối thiểu 8 ký tự.";
export const PASSWORD_CONFIRMATION_MESSAGE = "Mật khẩu nhập lại không đúng!!";

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
