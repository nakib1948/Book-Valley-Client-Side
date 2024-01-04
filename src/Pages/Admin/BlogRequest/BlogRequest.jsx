import Loader from "../../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import BlogRequestTable from "./BlogRequestTable";
import axios from "axios";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import { Helmet } from "react-helmet-async";
const BlogRequest = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getAllBlog"],
    queryFn: async () => {
      const res = await axios.get(
        `https://book-valley-server-side.vercel.app/getAllBlog`
      );
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
    <div className="mt-10">
      <Helmet>
        <title>Book Valley | Blog Request</title>
      </Helmet>
      <HeaderTitle title="Book request from Writers"></HeaderTitle>
      <div className="overflow-x-auto mt-10 w-full card-body bg-slate-50 rounded-xl">
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
    </div>
  );
};

export default BlogRequest;
