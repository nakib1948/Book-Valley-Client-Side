import Footer from "../Shared/Footer/Footer";
import Blog from "./Blog/Blog";
import Categories from "./Categories/Categories";
import ContactUs from "./ContactUs/ContactUs";
import FeaturedCollection from "./FeaturedCollection/FeaturedCollection";
import OfferSection from "./OfferSection/OfferSection";
import Secondsection from "./SecondSection/SecondSection";
import Topslider from "./Topslider/Topslider";
import WebsiteReview from "./Websitereview/WebsiteReview";

const Home = () => {
    return (
        <div>
            <Topslider/>
            <Secondsection/>
         
            <Categories/>
            <FeaturedCollection/>
            <OfferSection/>
            <WebsiteReview/>
            <Blog/>
            <ContactUs/>
        </div>
    );
};

export default Home;