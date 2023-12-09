import Loader from "../../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import BlogRequestTable from "./BlogRequestTable";
import axios from "axios";

const BlogRequest = () => {
 
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getAllBlog"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/getAllBlog`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="overflow-x-auto w-full card-body bg-slate-50 rounded-xl">
      <table className="table">
        <thead>
          <tr className="text-base">
            <th className="text-base text-purple">Blog Image</th>
            <th className="text-base text-purple">Blog Name</th>
            <th className="text-base text-purple">Writer</th>
            <th className="text-base text-purple">Writer Email</th>
            <th className="text-base text-purple">Blog Content</th>
            <th className="text-base text-purple">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <BlogRequestTable
              refetch={refetch}
              request={data}
              key={index}
            ></BlogRequestTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogRequest;
