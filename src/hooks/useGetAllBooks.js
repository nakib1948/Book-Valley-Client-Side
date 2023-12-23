import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useGetAllBooks = () => {
   
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["allbooks"],
        queryFn: async () => {
          const res = await axios.get("https://horse-raincoat.cyclic.app/allbooks");
          return res.data;
        },
      });
      return [data, isLoading, error, refetch];
};

export default useGetAllBooks;