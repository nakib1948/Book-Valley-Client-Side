import dashboard from "../../../assets/Dashboard/dashboard.png";
import shop from "../../../assets/Dashboard/shop.png";
import home from "../../../assets/Dashboard/home.png";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useGetUserRole from "../../../hooks/useGetUserRole";
import Loader from "../Loader/Loader";
import { pdfContext } from "../../../Providers/PdfLinkProvider";
const PdfPreview = () => {
  const { user } = useContext(AuthContext);
  const [isRole, isRoleLoading] = useGetUserRole();
  const navigate = useNavigate();
  const [booklink, setBookLink] = useContext(pdfContext);

  if (isRoleLoading) {
    <Loader></Loader>;
  }

  const path = () => {
    if (user) {
      if (isRole === "writer") navigate("/readerprofile");
      else if (isRole === "reader") navigate("/reader/dashboard");
      else if (isRole === "publisher") navigate("/Publisher");
      else if (isRole === "admin") navigate("/admin");
      else navigate("/");
    }
  };

  return (
    <div>
      <embed src={booklink} className="w-full h-screen" />
      <div className="btm-nav  btm-nav-xs">
        <button className="bg-pink-200 text-pink-600">
          <img src={home} className="h-7" alt="" />
          <span >Home</span>
        </button>
        <button className="active bg-blue-200 text-blue-600 border-blue-600">
          <img src={shop} className="h-7" alt="" />
          <span >Shop</span>
        </button>
        <button onClick={path} className="bg-teal-200 text-teal-600">
          <img src={dashboard} className="h-5" alt="" />
          <span >Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default PdfPreview;
