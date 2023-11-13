import { Link, useNavigate } from "react-router-dom";
import bookIcon from "../../../assets/bookstore.png";
import cart from "../../../assets/Home/cart.png";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useGetUserRole from "../../../hooks/useGetUserRole";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isRole] = useGetUserRole();
  const navigate = useNavigate();
  const signout = () => {
    logOut().then(() => {
      localStorage.removeItem("access-token");
    });
    navigate("/");
  };

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
        <img className="h-14" src={bookIcon} alt="" />
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
            {user ? (
              isRole === "reader" ? (
                <Link to="/readerprofile">Dashboard</Link>
              ) : isRole === "writer" ? (
                <Link to="/writer">Dashboard</Link>
              ) : isRole === "publisher" ? (
                <Link to="/publisher">Dashboard</Link>
              ) : (
                <Link to="/admin">Dashboard</Link>
              )
            ) : (
              <Link to="/login">Dashboard</Link>
            )}
          </li>
          <li className="text-lg">
            <Link to="/cart">
              <img src={cart} className="h-10" alt="" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <div>
            <img
              onClick={() => window.my_modal_2.showModal()}
              className="h-16 rounded-full group hover:tooltip"
              src={user.photoURL}
              alt="User Dashboard"
              title={user.displayName}
            />
            <dialog id="my_modal_2" className="modal">
              <form method="dialog" className="modal-box bg-base-200">
                <img
                  className="h-16 rounded-full mx-auto"
                  src={user.photoURL}
                  alt="User Dashboard"
                  title={user.displayName}
                />
                <p className="text-lg text-deepred text-center">
                  Name: {user.displayName}
                </p>
                <p className="py-4 text-deepred text-center">
                  Email: {user.email}
                </p>
                <button
                  onClick={() => signout()}
                  className="btn btn-block bg-deepred text-white"
                >
                  Logout
                </button>
              </form>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn text-lg text-semibold text-white rounded-full bg-deepblue"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
