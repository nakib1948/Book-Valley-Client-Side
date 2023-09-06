import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Nabvar";

const Main = () => {
  return (
    <div >
      <Navbar></Navbar>
      <Outlet />
  
    </div>
  );
};

export default Main;