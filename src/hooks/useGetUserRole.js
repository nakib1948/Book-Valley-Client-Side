import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProvider";


const useGetUserRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ["isrole", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data.role;
    },
  });
  return [isRole, isRoleLoading];
};
export default useGetUserRole;