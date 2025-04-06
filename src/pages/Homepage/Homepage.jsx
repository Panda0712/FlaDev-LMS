import Banner from "~/pages/Homepage/Banner/Banner";
import FeedBacks from "~/pages/Homepage/FeedBacks/FeedBacks";
import GetStartedBanner from "~/pages/Homepage/GetStartedBanner/GetStartedBanner";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <FeedBacks />
      <GetStartedBanner />
    </div>
  );
};

export default Homepage;
