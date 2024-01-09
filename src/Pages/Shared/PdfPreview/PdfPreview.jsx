import { useState, useEffect, useContext } from "react";
import dashboard from "../../../assets/Dashboard/dashboard.png";
import shop from "../../../assets/Dashboard/shop.png";
import home from "../../../assets/Dashboard/home.png";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useGetUserRole from "../../../hooks/useGetUserRole";
import { pdfContext } from "../../../Providers/PdfLinkProvider";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../Loader/Loader";
const PdfPreview = () => {
  const { user } = useContext(AuthContext);
  const [isRole, isRoleLoading] = useGetUserRole();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const [booklink, setBookLink] = useContext(pdfContext);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  useEffect(() => {
    fetch(`https://book-valley-server-side.vercel.app/getbooklink/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setBookLink(data.booklink));
  }, [setBookLink, user?.email]);

  useEffect(() => {
    const timeout = setInterval(() => {
      const randomTop = `${Math.floor(Math.random() * 60) + 20}%`;
      const randomLeft = `${Math.floor(Math.random() * 60) + 20}%`;

      setPosition({ top: randomTop, left: randomLeft });
    }, 3000);

    return () => clearInterval(timeout);
  }, [setBookLink, user?.email, axiosSecure]);

  if (isRoleLoading) {
    <Loader />;
  }

  const path = () => {
    if (user) {
      if (isRole === "writer") navigate("/writer/writerBooks");
      else if (isRole === "reader") navigate("/reader/readerPremimumbooks");
      else if (isRole === "publisher") navigate("/Publisher/publishedBook");
      else if (isRole === "admin") navigate("/admin/statistic");
      else navigate("/");
    }
  };
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform = (slot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    Print: () => <></>,
    Open: () => <></>,
  });

  return (
    <div
      className="h-screen overflow-x-scroll"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Helmet>
        <title>Book Valley | Pdf Viewer</title>
      </Helmet>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            padding: "0.25rem",
          }}
        >
          <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
        </div>
        <div>
          {booklink && (
            <Viewer fileUrl={booklink} plugins={[toolbarPluginInstance]} />
          )}
        </div>
      </Worker>

      <div className="btm-nav btm-nav-xs">
        <Link to="/" className="bg-pink-200 text-pink-600">
          <img src={home} className="h-7" alt="" />
          <span>Home</span>
        </Link>
        <Link
          to="/allbooks"
          className="active bg-blue-200 text-blue-600 border-blue-600"
        >
          <img src={shop} className="h-7" alt="" />
          <span>Shop</span>
        </Link>
        <button onClick={path} className="bg-teal-200 text-teal-600">
          <img src={dashboard} className="h-5" alt="" />
          <span>Dashboard</span>
        </button>
      </div>
      {/* Watermark with user's email */}
      <div className="watermark" style={position}>
        {user && user.email && (
          <span className="watermark-text" style={{ color: "red" }}>
            {user.email}
          </span>
        )}
      </div>
      <style>
        {`
          .controls {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }

          .watermark-container {
            position: relative;
          }

          .watermark {
            position: absolute;
            transform: translate(-50%, -50%);
            font-size: 18px;
          }
        `}
      </style>
    </div>
  );
};

export default PdfPreview;
