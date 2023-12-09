import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../Pages/Writer/Dashboard/Header";
import home from "../assets/Dashboard/home.png";
import publisher from "../assets/Dashboard/publisher.png";
import request from "../assets/Dashboard/request.png";
import shop from "../assets/Dashboard/shop.png";
import blog from "../assets/Dashboard/blog.png";
import profile from "../assets/Dashboard/profile.png";
import paymentHistory from "../assets/payment-history.png";
import earning from "../assets/Dashboard/earning.png";
import withdraw from "../assets/Publisher/withdraw.png";
import { AuthContext } from "../Providers/AuthProvider";
import bookIcon from "../assets/book-icon.png";

const Dashboard = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  let { pathname } = location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className=" p-2">
     
      <div className="grid grid-cols-4 gap-0 md:gap-2 lg:gap-2 p-2">
        <div className="md:col-span-1 lg:col-span-1 col-span-2 bg-white m-3  shadow-md rounded-md p-2 ">
          <div className="drawer lg:drawer-open relative z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side ">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 bg-white  min-h-full text-base-content">
                {/* Sidebar content here */}
                <div className="flex items-center mb-5">
                  <img src={bookIcon} className="h-20" alt="" />
                  <p className="text-3xl font-bold">Book Valley</p>
                </div>
                <div className="flex overflow-x-scroll items-center mb-5 px-1 rounded py-2 bg-slate-100">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                  <div className="ml-2 ">
                    <p className="text-xl font-semibold">Welcome</p>
                    <p className="text-base font-bold">{user?.displayName}</p>
                  </div>
                </div>
                <li className="bg-slate-50  rounded-sm my-1">
                  <Link to="/" className="text-base font-semibold">
                    <img src={home} className="h-5" alt="" />
                    Home
                  </Link>
                </li>

                <li className="bg-slate-50 rounded-sm my-1">
                  <Link
                    to="/writer/writerBooks"
                    className="text-base my-1 font-semibold"
                  >
                    <img src={publisher} className="h-5" alt="" />
                     Your Books
                  </Link>
                </li>

                <li className="bg-slate-50 rounded-sm my-1">
                  <Link
                    to="/writer/publisherlist"
                    className="text-base my-1 font-semibold"
                  >
                    <img src={publisher} className="h-5" alt="" />
                    Publisher
                  </Link>
                </li>

                <li className="bg-slate-50 rounded-sm my-1">
                  <Link to="/writer/allrequest" className="text-base my-1 font-semibold">
                    <img src={request} className="h-5" alt="" />
                    Request
                  </Link>
                </li>
                
                <li className="bg-slate-50 rounded-sm my-1">
                  <Link to="/writer/blogwriting" className="text-base my-1 font-semibold">
                    <img src={blog} className="h-5" alt="" />
                    Blog
                  </Link>
                </li>

                <li className="bg-slate-50 rounded-sm my-1">
                  <Link to="/writer/updateWriterProfile" className="text-base my-1 font-semibold">
                    <img src={profile} className="h-5" alt="" />
                    Profile
                  </Link>
                </li>


                <li className="bg-slate-50 rounded-sm my-1">
                  <Link className="text-base my-1 font-semibold">
                    <img src={earning} className="h-5" alt="" />
                    Earning
                  </Link>
                </li>

                <li className="bg-slate-50 rounded-sm my-1">
                  <Link className="text-base my-1 font-semibold">
                    <img src={withdraw} className="h-5" alt="" />
                    Withdraw History
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          id="noscrollbar"
          className="md:col-span-3 h-screen lg:col-span-3 col-span-5 bg-white m-0 md:m-3 lg:m-3 shadow-md rounded-md p-2 overflow-y-scroll "
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
