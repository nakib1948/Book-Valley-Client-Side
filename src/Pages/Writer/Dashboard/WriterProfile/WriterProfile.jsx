import Freebooks from "../../../Reader/Freebooks/Freebooks";
import Premiumbooks from "../../../Reader/Premiumbooks/Premiumbooks";
const WriterProfile = () => {
  return (
    <div>
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
