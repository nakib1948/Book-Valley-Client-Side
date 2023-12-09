import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";
import { useForm } from "react-hook-form";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getSingleBlogDetails"],
    queryFn: async () => {
      const res = await axiosSecure(`/getSingleBlogDetails/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-5/6 mx-auto">
          <div className="rounded-lg h-64 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src={data.blogCoverPhoto}
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={data.writerImg} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  {data.writerName}
                </h2>
                
                <p className="text-base">
                 {data.date}
                </p>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                 {data.name}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
               {data.description}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
