// import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "~/components/Footer/Footer";
import Navbar from "~/components/Navbar/Navbar";
import Auth from "~/pages/Auth/Auth";
import Verification from "~/pages/Auth/Verification";
import Blog from "~/pages/Blog/Blog";
import Contact from "~/pages/Contact/Contact";
import Course from "~/pages/Courses/Course/Course";
import Courses from "~/pages/Courses/Courses";
// import NotFound from "~/pages/404/NotFound";
import Homepage from "~/pages/Homepage/Homepage";
import NotFound from "~/pages/NotFound/NotFound";
// import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";

const ProtectedRoutes = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

// const AdminRoutes = ({ user }) => {
//   if (!user || user.role !== ACCOUNT_ROLES.ADMIN)
//     return <Navigate to="/" replace={true} />;
//   return <Outlet />;
// };

const App = () => {
  // const currentUser = useSelector(selectCurrentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        {/* <Route element={<AdminRoutes user={currentUser} />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Admin />} />
            <Route path="dashboard" element={<Homepage />} />
          </Route>
        </Route> */}
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
          {/* <Route element={<ProtectedRoutes user={null} />}> */}
          {/* Homepage */}
          <Route path="/" element={<Homepage />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />

          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Course />} />

          {/* Profile */}
          {/* <Route path="/account/security" element={<Profile />} />
            <Route path="/account/general" element={<Profile />} /> */}

          {/* Authentication */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/verification" element={<Verification />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
