import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Unknownpage from "../Pages/UnknownPage/Unknownpage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Allbooks from "../Pages/Allbooks/Allbooks";
import SinglebookDetails from "../Pages/Allbooks/SinglebookDetails";
import Cart from "../Pages/Cart/Cart";
import ReaderProfile from "../Pages/Reader/ReaderProfile";
import Viewbook from "../Pages/Reader/viewbook/Viewbook";
import Dashboard from "../Layout/WriterDashboard";
import Publisherlist from "../Pages/Writer/Dashboard/PublisherList/Publisherlist";
import RequestFeedback from "../Pages/Writer/Dashboard/RequestFeedback/RequestFeedback";
import WriterProfile from "../Pages/Writer/Dashboard/WriterProfile/WriterProfile";
import PublisherDashboard from "../Layout/PublisherDashboard";
import Offer from "../Pages/Publisher/Offer/Offer";
import UserType from "../Pages/Signup/UserType";
import WriterSignup from "../Pages/Signup/WriterSignup";
import PublisherSignup from "../Pages/Signup/PublisherSignup";
import AdminDashboard from "../Layout/AdminDashboard";
import AdminRoute from "./AdminRoute";
import WriterRoute from "./WriterRoute";
import PublisherRoute from "./PublisherRoute";
import PrivateRoute from "./PrivateRoute";
import Allusers from "../Pages/Admin/Allusers/Allusers";
import BookRequest from "../Pages/Admin/BookRequest/BookRequest";
import PdfPreview from "../Pages/Shared/PdfPreview/PdfPreview";
import Payment from "../Pages/Payment/Payment";
import UploadBook from "../Pages/Admin/UploadBook/UploadBook";
import Freebook from "../Pages/Allbooks/Freebook/Freebook";
import ReaderDashboard from "../Layout/ReaderDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/usertype",
        element: <UserType></UserType>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/writersignup",
        element: <WriterSignup></WriterSignup>,
      },
      {
        path: "/publishersignup",
        element: <PublisherSignup></PublisherSignup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/allbooks",
        element: <Allbooks></Allbooks>,
      },
      {
        path: "/allbooks/:id",
        element: <SinglebookDetails></SinglebookDetails>,
      },
      {
        path: "/cart",
        element:<PrivateRoute><Cart></Cart></PrivateRoute> ,
      },
      {
        path: "/viewbook",
        element:<PrivateRoute> <Viewbook></Viewbook></PrivateRoute>,
      },
      {
         path:"/payment",
         element:<PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
         path:"/freebook",
         element:<PrivateRoute><Freebook></Freebook></PrivateRoute>
      }
    ],
  },
  {
    path: "/reader",
    element:<PrivateRoute><ReaderDashboard></ReaderDashboard></PrivateRoute> ,
    children: [
      {
        path: "dashboard",
        element: <ReaderProfile></ReaderProfile>,
      },
      {
        path: "allrequest",
        element: <RequestFeedback></RequestFeedback>,
      },
      {
        path: "profile",
        element: <WriterProfile></WriterProfile>,
      },
    ],
  },
  {
    path: "/writer",
    element:<WriterRoute><Dashboard></Dashboard></WriterRoute> ,
    children: [
      {
        path: "publisherlist",
        element: <Publisherlist></Publisherlist>,
      },
      {
        path: "allrequest",
        element: <RequestFeedback></RequestFeedback>,
      },
      {
        path: "profile",
        element: <WriterProfile></WriterProfile>,
      },
    ],
  },
  {
    path: "/Publisher",
    element:<PublisherRoute><PublisherDashboard></PublisherDashboard></PublisherRoute> ,
    children: [
      {
        path: "offer",
        element: <Offer></Offer>,
      },
      {
        path: "allrequest",
        element: <RequestFeedback></RequestFeedback>,
      },
      {
        path: "profile",
        element: <WriterProfile></WriterProfile>,
      },
    ],
  },
  {
    path: "/admin",
    element:<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute> ,
    children: [
      {
        path: "allusers",
        element: <Allusers></Allusers>,
      },
      {
        path: "allbookrequest",
        element: <BookRequest></BookRequest>,
      },
      {
        path: "profile",
        element: <WriterProfile></WriterProfile>,
      },
      {
        path: "uploadBook",
        element: <UploadBook></UploadBook>,
      },
    ],
  },
  {
    path:"/pdfreader",
    element:<PdfPreview/>
  },
  {
    path: "*",
    element: <Unknownpage />,
  },
]);
