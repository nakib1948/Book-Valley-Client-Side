import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["allusers"],
        queryFn: async () => {
          const res = await axiosSecure("/allusers");
          return res.data;
        },
      });
      return [data, isLoading, error, refetch];
};

export default useGetAllUsers;