// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "~/components/Footer/Footer";
import Navbar from "~/components/Navbar/Navbar";
import Admin from "~/pages/Admin/Admin";
import AdminBlogDetails from "~/pages/Admin/BlogDetails";
import AdminBlogs from "~/pages/Admin/Blogs";
import AdminContacts from "~/pages/Admin/Contacts";
import AdminCourses from "~/pages/Admin/Courses";
import Dashboard from "~/pages/Admin/Dashboard";
import AdminNotifications from "~/pages/Admin/Notifications";
import AdminOrders from "~/pages/Admin/Orders";
import AdminReviews from "~/pages/Admin/Reviews";
import AdminVouchers from "~/pages/Admin/Vouchers";
import Auth from "~/pages/Auth/Auth";
import Blog from "~/pages/Blog/Blog";
import BlogDetails from "~/pages/Blog/BlogDetails";
import Cart from "~/pages/Cart/Cart";
import Contact from "~/pages/Contact/Contact";
import Course from "~/pages/Courses/Course/Course";
import CourseLearning from "~/pages/Courses/CourseLearning/CourseLearning";
import Courses from "~/pages/Courses/Courses";
import Homepage from "~/pages/Homepage/Homepage";
import NotFound from "~/pages/NotFound/NotFound";
import Notifications from "~/pages/Notification/Notification";
import Order from "~/pages/Order/Order";
import Profile from "~/pages/Profile/Profile";
import Wishlist from "~/pages/Wishlist/Wishlist";
import { ACCOUNT_ROLES } from "~/utils/constants";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/auth/login" replace={true} />;

  if (user?.role === ACCOUNT_ROLES.ADMIN) return <Navigate to="/admin" />;
  return <Outlet />;
};

const AdminRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user || user.role !== ACCOUNT_ROLES.ADMIN)
    return <Navigate to="/" replace={true} />;
  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            {/* <Route
              path="courses/:hotelId"
              element={<HotelDetailsManagement />}
            /> */}
            <Route path="contact" element={<AdminContacts />} />
            <Route path="vouchers" element={<AdminVouchers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="notifications" element={<AdminNotifications />} />
            {/* <Route
              path="booking/:bookingId"
              element={<BookingDetailsManagement />}
            /> */}
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="review" element={<AdminReviews />} />
            <Route path="blogs/:blogId" element={<AdminBlogDetails />} />
            {/* <Route path="blogs/create" element={<BlogFormPage />} /> */}
            {/* <Route path="blogs/create/:blogId" element={<BlogFormPage />} /> */}
          </Route>
        </Route>
        {/* User Routes */}
        <Route
          element={
            <div className="flex flex-col justify-between min-h-screen">
              <Navbar />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route element={<ProtectedRoutes />}>
            {/* Homepage */}
            <Route path="/" element={<Homepage />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:blogId" element={<BlogDetails />} />

            {/* Courses */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route
              path="/courses/:courseId/learning"
              element={<CourseLearning />}
            />

            {/* Cart */}
            <Route path="/cart" element={<Cart />} />

            {/* Wishlist */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Order */}
            <Route path="/order/complete" element={<Order />} />
            <Route path="/order/checkout" element={<Order />} />
            <Route path="/order/history" element={<Order />} />

            {/* Order */}
            <Route path="/notifications" element={<Notifications />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/list_courses" element={<Profile />} />
            <Route path="/profile/list_teachers" element={<Profile />} />
            <Route path="/profile/list_reviews" element={<Profile />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Authentication */}
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/register" element={<Auth />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
