import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Unknownpage from "../Pages/UnknownPage/Unknownpage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Allbooks from "../Pages/Allbooks/Allbooks";
import SinglebookDetails from "../Pages/Allbooks/SinglebookDetails";
import Cart from "../Pages/Cart/Cart";
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
import Freebooks from "../Pages/Reader/Freebooks/Freebooks";
import Premiumbooks from "../Pages/Reader/Premiumbooks/Premiumbooks";
import PaymentHistory from "../Pages/Reader/PaymentInformation/PaymentHistory";
import UpdateProfile from "../Pages/Reader/UpdateProfile/UpdateProfile";
import UpdateWriterProfile from "../Pages/Writer/Dashboard/UpdateWriteprofile/UpdateWriterProfile";
import WriterBooks from "../Pages/Writer/Dashboard/WriterBooks/WriterBooks";
import BlogWriting from "../Pages/Writer/Dashboard/BlogWriting/BlogWriting";
import BlogRequest from "../Pages/Admin/BlogRequest/BlogRequest";
import BlogDetails from "../Pages/Home/Blog/BlogDetails";
import Earning from "../Pages/Writer/Dashboard/Earning/Earning";
import WithdrawHistory from "../Pages/Writer/Dashboard/withdrawHistory/withdrawHistory";
import PublishedBook from "../Pages/Publisher/PublishedBook/PublishedBook";
import PublisherEarning from "../Pages/Publisher/Earning/publisherEarning";
import UpdatePublisherProfile from "../Pages/Publisher/UpdatePublisherProfile/UpdatePublisherProfile";
import Statistic from "../Pages/Admin/Statistic/Statistic";

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
        element:<Cart></Cart> ,
      },
      {
         path: "/freeBook",
         element: <Freebook></Freebook>
      },
      {
        path:"/payment",
        element:<Payment></Payment>
      },
      {
        path:"/blog/:id",
        element:<BlogDetails></BlogDetails>
      }
    ],
  },
  {
    path: "/reader",
    element:<PrivateRoute><ReaderDashboard></ReaderDashboard></PrivateRoute> ,
    children: [
      {
        path: "readerPremimumbooks",
        element: <Premiumbooks></Premiumbooks>,
      },
      {
        path: "readerFreeBook",
        element: <Freebooks></Freebooks>,
      },
      {
        path: "paymentDetails",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "readerUpdateProfile",
        element: <UpdateProfile></UpdateProfile>,
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
      {
        path: "updateWriterProfile",
        element: <UpdateWriterProfile></UpdateWriterProfile>,
      },
      {
        path: "writerBooks",
        element: <WriterBooks></WriterBooks>,
      },
      {
        path: "blogwriting",
        element: <BlogWriting></BlogWriting>,
      },
      {
        path: "earning",
        element: <Earning></Earning>,
      },
      {
        path: "withdrawHistory",
        element: <WithdrawHistory></WithdrawHistory>,
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
        path: "publishedBook",
        element: <PublishedBook></PublishedBook>,
      },
      {
        path: "publisherEarning",
        element: <PublisherEarning></PublisherEarning>,
      },
      {
        path: "withdrawHistory",
        element: <WithdrawHistory></WithdrawHistory>,
      },
      {
        path: "updatePublisherProfile",
        element: <UpdatePublisherProfile></UpdatePublisherProfile>,
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
        path: "statistic",
        element: <Statistic></Statistic>,
      },
      {
        path: "uploadBook",
        element: <UploadBook></UploadBook>,
      },
      {
        path: "blogrequest",
        element: <BlogRequest></BlogRequest>,
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
