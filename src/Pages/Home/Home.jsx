import Categories from "./Categories/Categories";
import Secondsection from "./SecondSection/SecondSection";
import Topslider from "./Topslider/Topslider";

const Home = () => {
    return (
        <div>
            <Topslider/>
            <Secondsection/>
            <Categories/>
        </div>
    );
};

export default Home;