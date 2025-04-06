import Banner from "~/pages/Homepage/Banner/Banner";
import Details from "~/pages/Homepage/Details/Details";
import Explore from "~/pages/Homepage/Explore/Explore";
import FeaturedCourses from "~/pages/Homepage/FeaturedCourses/FeaturedCourses";
import FeedBacks from "~/pages/Homepage/FeedBacks/FeedBacks";
import GetStartedBanner from "~/pages/Homepage/GetStartedBanner/GetStartedBanner";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <FeaturedCourses />
      <Details />
      <Explore />
      <FeedBacks />
      <GetStartedBanner />
    </div>
  );
};

export default Homepage;
