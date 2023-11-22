import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useGetAllBooks = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["allbooks"],
        queryFn: async () => {
          const res = await axiosSecure("/allbooks");
          return res.data;
        },
      });
      return [data, isLoading, error, refetch];
};

export default useGetAllBooks;