import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Nabvar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div >
      <Navbar></Navbar>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Main;