export function capitalizeWords(str) {
  return str
    .split(" ") // Split string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join words back into a sentence
}

export const formatVND = (price = 0) => {
  return price.toLocaleString("vi-VN");
};

export const formatDateV1 = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}-${month}-${year}`; // Định dạng DD-MM-YYYY
};

export const formatDateV2 = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  return date.toISOString().split("T")[0]; // dạng "YYYY-MM-DD"
};

export const interceptorLoadingElements = (calling) => {
  // DOM lấy ra toàn bộ phần tử trên page hiện tại có className là 'interceptor-loading'
  const elements = document.querySelectorAll(".interceptor-loading");
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // Nếu đang trong thời gian chờ gọi API (calling === true) thì sẽ làm mờ phần tử và chặn click bằng css pointer-events
      elements[i].style.opacity = "0.5";
      elements[i].style.pointerEvents = "none";
    } else {
      // Ngược lại thì trả về như ban đầu, không làm gì cả
      elements[i].style.opacity = "initial";
      elements[i].style.pointerEvents = "initial";
    }
  }
};
