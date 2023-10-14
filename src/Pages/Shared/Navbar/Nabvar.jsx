
import { Link } from "react-router-dom";
import bookIcon from "../../../assets/bookstore.png";
import cart from "../../../assets/Home/cart.png";
const Navbar = () => {

  return (
    <div className="navbar h-10 sticky top-0 z-10 bg-opacity-70  bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52"
          >
            <li className="text-lg">
              <a>Item 1</a>
            </li>
            <li className="text-lg">
              <a>Parent</a>
              <ul className="p-2">
                <li className="text-lg">
                  <a>Submenu 1</a>
                </li>
                <li className="text-lg">
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li className="text-lg">
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <img  className="h-14" src={bookIcon}  alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="text-lg">
            <Link to="/">Home</Link>
          </li>
          <li className="text-lg">
            <Link to="/allbooks">shop</Link>
          </li>
          <li className="text-lg">
            <Link to="/readerprofile">Profile</Link>
          </li>
          <li className="text-lg">
          
            <Link to="/cart"><img src={cart} className="h-10" alt="" /></Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn text-lg text-semibold text-white rounded-full bg-deepblue">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
