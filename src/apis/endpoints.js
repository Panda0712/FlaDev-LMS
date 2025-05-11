import api from "./api";

// Courses
export const fetchCourses = () => api.get("/courses");
export const fetchCourseById = (id) => api.get(`/courses/${id}`);
export const createCourse = (data) => api.post("/courses", data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// Modules
export const fetchModules = () => api.get("/modules");
export const createModule = (data) => api.post("/modules", data);
export const updateModule = (id, data) => api.put(`/modules/${id}`, data);
export const deleteModule = (id) => api.delete(`/modules/${id}`);

// Reviews
export const fetchReviews = () => api.get("/reviews");
export const createReview = (data) => api.post("/reviews", data);
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Blogs
export const fetchBlogs = () => api.get("/blogs");
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// Contacts
export const fetchContacts = () => api.get("/contacts");
export const createContact = (data) => api.post("/contacts", data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

// Orders
export const fetchOrders = () => api.get("/orders");
export const fetchOrderById = (id) => api.get(`/orders/${id}`);
export const createOrder = (data) => api.post("/orders", data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Vouchers
export const fetchVouchers = () => api.get("/vouchers");
export const createVoucher = (data) => api.post("/vouchers", data);
export const updateVoucher = (id, data) => api.put(`/vouchers/${id}`, data);
export const deleteVoucher = (id) => api.delete(`/vouchers/${id}`);

// Cart
export const fetchCart = () => api.get("/carts");
export const addToCart = (data) => api.post("/carts", data);
export const updateCart = (id, data) => api.put(`/carts/${id}`, data);
export const deleteCart = (id) => api.delete(`/carts/${id}`);

// Profile/User
export const fetchUserProfile = () => api.get("/user");
export const updateUserProfile = (data) => api.put("/user", data);

// Auth
export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);
export const logout = () => api.post("/logout");
export const resetPassword = (data) => api.post("/password/reset", data);

// Media
export const uploadMedia = (data) => api.post("/media/upload", data);
