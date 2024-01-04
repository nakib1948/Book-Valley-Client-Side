import Freebooks from "../../../Reader/Freebooks/Freebooks";
import Premiumbooks from "../../../Reader/Premiumbooks/Premiumbooks";
import { Helmet } from "react-helmet-async";

const WriterProfile = () => {
  return (
    <div>
      <Helmet>
        <title>Book Valley | Profile</title>
      </Helmet>
      <p className="text-3xl font-bold ml-10 mb-10">Your Published Book</p>
      <Freebooks />
      <p className="text-3xl font-bold ml-10 mb-10">Your Premium Book</p>
      <Premiumbooks />
      <p className="text-3xl font-bold ml-10 mb-10">Your Free Book</p>
      <Freebooks />
    </div>
  );
};

export default WriterProfile;
