import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useGetUserRole from "../hooks/useGetUserRole";
import Loader from "../Pages/Shared/Loader/Loader";
const WriterRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const [isRole, isRoleLoading] = useGetUserRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <Loader />;
  }

  if (user && isRole == "writer") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default WriterRoute;
