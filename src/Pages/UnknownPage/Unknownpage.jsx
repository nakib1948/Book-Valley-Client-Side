import error from "../../assets/error404.json"
import Lottie from "lottie-react";
const Unknownpage = () => {
    return (
        <div>
            <Lottie className="h-screen" animationData={error} />
        </div>
    );
};

export default Unknownpage;