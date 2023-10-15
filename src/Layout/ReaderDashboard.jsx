import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../Pages/Writer/Dashboard/Header";

const Dashboard = () => {
  const location = useLocation();
  let { pathname } = location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className=" p-2">
      <Header />
      <div className="grid grid-cols-5 gap-0 md:gap-2 lg:gap-2 p-2">
        <div className="md:col-span-1 lg:col-span-1 col-span-2 bg-white m-3 h-screen  shadow-md rounded-md p-2 ">
          <div className="drawer lg:drawer-open h-screen">
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
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 bg-white  text-base-content">
                {/* Sidebar content here */}
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          id="noscrollbar" 
          className="md:col-span-4 h-screen lg:col-span-4 col-span-5 bg-white m-0 md:m-3 lg:m-3 shadow-md rounded-md p-2 overflow-y-scroll"
        >
          asdfsdafdsf
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
