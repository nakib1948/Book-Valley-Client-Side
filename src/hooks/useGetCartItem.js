import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useGetCartItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["getCartItem"],
        queryFn: async () => {
            const res = await axiosSecure(`/getCartItem`);
            return res.data;
        },
    });
    return [data, isLoading, error, refetch];
};

export default useGetCartItem;