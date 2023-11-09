import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useGetUserRole from "../hooks/useGetUserRole";
import Loader from "../Pages/Shared/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
  
    if (user?.email) {
      return children;
    }
  
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;