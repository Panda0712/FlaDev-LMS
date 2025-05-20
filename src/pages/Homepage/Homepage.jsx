import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCourses, fetchReviews } from "~/apis/endpoints";
import Loading from "~/components/Loading/Loading";
import Banner from "~/pages/Homepage/Banner/Banner";
import Details from "~/pages/Homepage/Details/Details";
import Explore from "~/pages/Homepage/Explore/Explore";
import FeaturedCourses from "~/pages/Homepage/FeaturedCourses/FeaturedCourses";
import FeedBacks from "~/pages/Homepage/FeedBacks/FeedBacks";
import GetStartedBanner from "~/pages/Homepage/GetStartedBanner/GetStartedBanner";

const Homepage = () => {
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchReviews(), fetchCourses()])
      .then(([reviewRes, courseRes]) => {
        setReviews(reviewRes || []);
        setCourses(courseRes || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Banner />
      <FeaturedCourses courses={courses} />
      <Details />
      <Explore />
      <FeedBacks reviews={reviews} />
      <GetStartedBanner />
    </div>
  );
};

export default Homepage;
