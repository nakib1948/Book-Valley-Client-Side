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
  const [booklink,setBookLink] = useContext(pdfContext)

  if (isRoleLoading) {
    <Loader></Loader>;
  }

  const path = () => {
    if (user) {
      if (isRole === "writer") navigate("/readerprofile");
      else if (isRole === "reader") navigate("reader/dashboard");
      else if (isRole === "publisher") navigate("/Publisher");
      else if (isRole === "admin") navigate("/admin");
      else navigate("/");
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <ul className="menu bg-base-200 menu-horizontal  rounded-box">
          <li>
            <a className="text-base font-semibold">
              <img src={home} className="h-7" alt="" />
              Home
            </a>
          </li>
          <li>
            <a className="text-base font-semibold">
              <img src={shop} className="h-7" alt="" />
              Shop
            </a>
          </li>
          <li>
            <a onClick={path} className="text-base font-semibold">
              <img src={dashboard} className="h-7" alt="" />
              Dashboard
            </a>
          </li>
        </ul>
      </div>
      <embed src={booklink} width="100%" height="600px" />
    </div>
  );
};

export default PdfPreview;
