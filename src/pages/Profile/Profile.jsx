import { useLocation } from "react-router-dom";
import ListCourses from "~/pages/Profile/ListCourses";
import ListReviews from "~/pages/Profile/ListReviews";
import ListTeachers from "~/pages/Profile/ListTeachers";
import ProfileGeneral from "~/pages/Profile/ProfileGeneral/ProfileGeneral";
import UserProfile from "~/pages/Profile/UserProfile";

const Profile = () => {
  const location = useLocation();

  const isUserProfile = location.pathname === "/profile";
  const isListCourses = location.pathname === "/profile/list_courses";
  const isListTeachers = location.pathname === "/profile/list_teachers";
  const isListReviews = location.pathname === "/profile/list_reviews";

  return (
    <section className="py-[32px] px-28 flex items-start gap-8">
      <ProfileGeneral />
      {isUserProfile && <UserProfile />}
      {isListCourses && <ListCourses />}
      {isListTeachers && <ListTeachers />}
      {isListReviews && <ListReviews />}
    </section>
  );
};

export default Profile;
