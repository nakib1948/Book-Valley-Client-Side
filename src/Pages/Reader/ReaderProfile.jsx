import paymentHistory from "../../assets/payment-history.png"
import Freebooks from "./Freebooks/Freebooks";
import Premiumbooks from "./Premiumbooks/Premiumbooks";

const ReaderProfile = () => {
  return (
    <div className="mt-5">
     
      <Premiumbooks/>
      <Freebooks/>
    </div>
  );
};

export default ReaderProfile;
