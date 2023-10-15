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
import Dashboard from "../Layout/ReaderDashboard";

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
        path: "/signup",
        element: <Signup></Signup>,
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
        element: <Cart></Cart>,
      },
      {
        path: "/readerprofile",
        element: <ReaderProfile></ReaderProfile>,
      },
      {
        path: "/viewbook",
        element: <Viewbook></Viewbook>,
      },
    ],
  },
  {
    path: "/reader",
    element: <Dashboard></Dashboard>,
    children: [],
  },

  {
    path: "*",
    element: <Unknownpage />,
  },
]);
