import Footer from "../Shared/Footer/Footer";
import Blog from "./Blog/Blog";
import Categories from "./Categories/Categories";
import ContactUs from "./ContactUs/ContactUs";
import FeaturedCollection from "./FeaturedCollection/FeaturedCollection";
import OfferSection from "./OfferSection/OfferSection";
import Secondsection from "./SecondSection/SecondSection";
import Topslider from "./Topslider/Topslider";
import WebsiteReview from "./Websitereview/WebsiteReview";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Book Valley | Home</title>
      </Helmet>
      <Topslider />
      <Secondsection />
      <Categories />
      <FeaturedCollection />
      <OfferSection />
      <WebsiteReview />
      <Blog />
      <ContactUs />
    </div>
  );
};

export default Home;
