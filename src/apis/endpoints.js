import { API_ROOT } from "~/utils/constants";
import api from "./api";

// Courses
export const fetchCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

export const fetchCourseById = async (id) => {
  const res = await api.get(`/courses/${id}`);
  return res.data;
};

export const createCourse = async (data) => {
  const res = await api.post("/courses", data);
  return res.data;
};

export const updateCourse = async (id, data) => {
  const res = await api.put(`/courses/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};

// Modules
export const fetchModules = async () => {
  const res = await api.get("/modules");
  return res.data;
};

export const createModule = async (data) => {
  const res = await api.post("/modules", data);
  return res.data;
};

export const updateModule = async (id, data) => {
  const res = await api.put(`/modules/${id}`, data);
  return res.data;
};

export const deleteModule = async (id) => {
  const res = await api.delete(`/modules/${id}`);
  return res.data;
};

// Reviews
export const fetchReviews = async () => {
  const res = await api.get("/reviews");
  return res.data;
};

export const createReview = async (data) => {
  const res = await api.post("/reviews", data);
  return res.data;
};

export const updateReview = async (id, data) => {
  const res = await api.put(`/reviews/${id}`, data);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};

// Blogs
export const fetchBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

export const fetchBlogById = async (id) => {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
};

export const createBlog = async (data) => {
  const res = await api.post("/blogs", data);
  return res.data;
};

export const updateBlog = async (id, data) => {
  const res = await api.put(`/blogs/${id}`, data);
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};

// Contacts
export const fetchContacts = async () => {
  const res = await api.get("/contacts");
  return res.data;
};

export const createContact = async (data) => {
  const res = await api.post("/contacts", data);
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await api.delete(`/contacts/${id}`);
  return res.data;
};

// Orders
export const fetchOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const fetchOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

export const updateOrder = async (id, data) => {
  const res = await api.put(`/orders/${id}`, data);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

// Vouchers
export const fetchVouchers = async () => {
  const res = await api.get("/vouchers");
  return res.data;
};

export const createVoucher = async (data) => {
  const res = await api.post("/vouchers", data);
  return res.data;
};

export const updateVoucher = async (id, data) => {
  const res = await api.put(`/vouchers/${id}`, data);
  return res.data;
};

export const fetchVoucherByName = async ({ code, courseId }) => {
  const res = await api.get("/vouchers/find-by-name", {
    params: { code, courseId },
  });
  return res.data;
};

export const deleteVoucher = async (id) => {
  const res = await api.delete(`/vouchers/${id}`);
  return res.data;
};

// Cart
export const fetchCart = async () => {
  const res = await api.get("/carts");
  return res.data;
};

export const addToCart = async (data) => {
  const res = await api.post("/carts", data);
  return res.data;
};

export const updateCart = async (id, data) => {
  const res = await api.put(`/carts/${id}`, data);
  return res.data;
};

export const deleteCart = async (id) => {
  const res = await api.delete(`/carts/${id}`);
  return res.data;
};

export const findCartByUserAndCourse = async (userId, courseId) => {
  const res = await api.get(`/carts/find-by-user-and-course`, {
    params: { userId, courseId },
  });
  return res.data;
};

// Wishlist
export const fetchWishlist = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

export const addToWishlist = async (data) => {
  const res = await api.post("/wishlist", data);
  return res.data;
};

export const updateWishlist = async (id, data) => {
  const res = await api.put(`/wishlist/${id}`, data);
  return res.data;
};

export const deleteWishlist = async (id) => {
  const res = await api.delete(`/wishlist/${id}`);
  return res.data;
};

// Profile/User
export const fetchUserProfile = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const updateUserProfile = async (id, data) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

// Auth
export const login = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/logout");
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await api.post("/password/reset", data);
  return res.data;
};

// Media
export const uploadMedia = async (data) => {
  const res = await api.post("/media/upload", data);
  return res.data;
};

export const uploadUserImage = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/users/uploads`, data);
  return res.data;
};

export const uploadBlogImageAPI = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/blogs/uploads`, data);
  return res.data;
};

export const uploadCourseImageAPI = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/courses/uploads`, data);
  return res.data;
};

export const uploadCourseVideoAPI = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/courses/uploads-videos`, data);
  return res.data;
};

// Lessons
export const fetchLessons = async () => {
  const res = await api.get("/lessons");
  return res.data;
};

export const createLesson = async (data) => {
  const res = await api.post("/lessons", data);
  return res.data;
};

export const updateLesson = async (id, data) => {
  const res = await api.put(`/lessons/${id}`, data);
  return res.data;
};

export const deleteLesson = async (id) => {
  const res = await api.delete(`/lessons/${id}`);
  return res.data;
};

// Progress
export const fetchCourseProgress = async (courseId, userId) => {
  const res = await api.get(`/progress/${courseId}`, { params: { userId } });
  return res.data;
};

export const fetchAllProgress = async (userId) => {
  const res = await api.get("/progress", { params: { userId } });
  return res.data;
};

export const updateLessonProgress = async (data) => {
  const res = await api.post("/progress/update-lesson", data);
  return res.data;
};

export const initCourseProgress = async (data) => {
  const res = await api.post("/progress/init", data);
  return res.data;
};

// Momo Payment
export const momoPaymentAPI = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/payment/momo`, data);
  return res.data;
};

// Zalopay Payment
export const zaloPaymentAPI = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/payment/zalopay`, data);
  return res.data;
};

// Create new notification
export const createNewNotificationAPI = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/notifications`, data);
  return res.data;
};

// Upload hotel notification image
export const uploadLMSNotificationImageAPI = async (data) => {
  const res = await api.post(`${API_ROOT}/v1/notifications/uploads`, data);
  return res.data;
};

// Update notification
export const updateNotificationAPI = async (notificationId, updateData) => {
  const res = await api.put(
    `${API_ROOT}/v1/notifications/${notificationId}`,
    updateData
  );
  return res.data;
};

// Delete notification
export const deleteNotificationAPI = async (notificationId) => {
  const res = await api.delete(
    `${API_ROOT}/v1/notifications/${notificationId}`
  );
  return res.data;
};
