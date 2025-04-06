import Banner from "~/pages/Homepage/Banner/Banner";
import Explore from "~/pages/Homepage/Explore/Explore";
import FeedBacks from "~/pages/Homepage/FeedBacks/FeedBacks";
import GetStartedBanner from "~/pages/Homepage/GetStartedBanner/GetStartedBanner";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <Explore />
      <FeedBacks />
      <GetStartedBanner />
    </div>
  );
};

export default Homepage;
