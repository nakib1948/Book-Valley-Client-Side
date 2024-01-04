import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import HeaderTitle from "../../../Shared/HeaderTitle/HeaderTitle";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const BlogWriting = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.blogCoverPhoto[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgResponse) => {
        const blogCoverPhoto = imgResponse.data.display_url;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const uploadBlog = {
          name: data.name,
          writerName: user.displayName,
          email: user.email,
          writerImg: user.photoURL,
          description: data.description,
          blogCoverPhoto,
          date: formattedDate,
          comment: [],
          status: "pending",
        };

        axiosSecure.post("/postWriterBlog", uploadBlog).then((data) => {
          if (data.data.insertedId) {
            toast.success("blog request send!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            reset();
          } else {
            toast.warn("somethings wrong!Try again", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
      });
  };

  return (
    <div className="mt-10 ">
      <HeaderTitle title="Upload your personal Blog"></HeaderTitle>
      <Helmet>
        <title>Book Valley | Blog</title>
      </Helmet>
      <ToastContainer />
      <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex">
            <div className="form-control w-full max-w-md lg:w-1/2 lg:pr-2">
              <label className="label">
                <span className="label-text text-lg">Blog Name</span>
              </label>
              <input
                type="text"
                placeholder="Blog name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  Blog name is required
                </small>
              )}
            </div>
            <div className="form-control w-full max-w-md lg:w-1/2 lg:pr-2">
              <label className="label">
                <span className="label-text text-lg">Book Cover Photo</span>
              </label>
              <input
                type="file"
                {...register("blogCoverPhoto", { required: true })}
                className="file-input file-input-bordered file-input-primary w-full"
              />
              {errors.photo?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  photo is required
                </small>
              )}
            </div>
          </div>

          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text text-lg">Blog Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="write your blog here"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description?.type === "required" && (
              <small className="text-red-500" role="alert">
                {" "}
                description is required
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn mt-5 btn-block text-xl text-white btn-primary"
          >
            send request
          </button>
        </form>
        ;
      </div>
    </div>
  );
};

export default BlogWriting;
