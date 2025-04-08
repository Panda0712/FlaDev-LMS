export const PAYMENT_METHODS = {
  MOMO: "MOMO",
  ZALOPAY: "ZALOPAY",
};

export const ORDER_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const ACCOUNT_ROLES = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
};

let apiRoot = "http://localhost:8017";
// if (process.env.BUILD_MODE === "dev") {
//   apiRoot = "http://localhost:8017";
// }
// if (process.env.BUILD_MODE === "production") {
//   apiRoot = "https://trello-backend-wkjl.onrender.com";
// }
export const API_ROOT = apiRoot;
