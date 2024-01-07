import { useQuery } from "@tanstack/react-query";
import book from "../../assets/All-Books/book1.jpg";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../Shared/Loader/Loader";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useGetUserRole from "../../hooks/useGetUserRole";
import { Helmet } from "react-helmet-async";
const SinglebookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [isRole, isRoleLoading] = useGetUserRole();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["singlebookdetails"],
    queryFn: async () => {
      const res = await axiosSecure(`/getSingleBookdetails/${id}`);
      return res.data;
    },
  });
  if (isLoading || isRoleLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const addtoCart = (data) => {
    axiosSecure(`/existsInPaidbook/${data._id}`).then((res) => {
      if (res.data.exists) return Swal.fire("You already bought this book!!!");
      else {
        axiosSecure(`/existsIncart/${data._id}`).then((res) => {
          if (res.data.exists)
            return Swal.fire("You already added this book!!!");
          else {
            axiosSecure.patch("/addTocart", data).then((data) => {
              if (data.data.modifiedCount) {
                Swal.fire("book added successfully");
              } else {
                Swal.fire("Something went wrong! try again");
              }
            });
          }
        });
      }
    });
  };

  const onSubmit = async (data) => {
    const review = {
      id,
      email: user.email,
      name: data.name,
      userImg: user.photoURL,
      rating: parseInt(data.rating),
      review: data.review,
    };

    axiosSecure(`/getCheckDuplicateReview/${user.email}/${id}`).then(
      (result) => {
        if (result.data !== "") {
          console.log(result);
          toast.warn("you already posted review", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        } else {
          axiosSecure.patch("/postreview", review).then((data) => {
            if (data.data.modifiedCount) {
              toast.success("review sent successfully!", {
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
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          });
        }
      }
    );
  };
  return (
    <div>
      <ToastContainer />
      <Helmet>
        <title>Book Valley | Book Details</title>
      </Helmet>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BOOK NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {data.name}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Description
                </a>
              </div>
              <p className="leading-relaxed mb-4">{data.description}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Category</span>
                <span className="ml-auto text-gray-900">{data.category}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Publisher</span>
                <span className="ml-auto text-gray-900">
                  {data.publisherName}
                </span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Writer</span>
                <span className="ml-auto text-gray-900">{data.writerName}</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${data.bookPrice}
                </span>
                {isRole !== "publisher" &&
                  isRole !== "writer" &&
                  isRole !== "admin" && (
                    <button
                      onClick={() => addtoCart(data)}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Add to Cart
                    </button>
                  )}

                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <img
              alt="book"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={data.bookCoverPhoto}
            />
          </div>
        </div>
      </section>

      <div className="  text-indigo-500 text-center border-b-4 border-indigo-500 py-2 mb-5 text-2xl font-semibold max-w-sm  mx-auto">
        Reviews
      </div>

      <div className="flex flex-wrap ">
        {data.review?.length && (
          <section className="rounded-md text-center mx-auto md:text-left h-96 overflow-y-scroll">
            {data.review.map((review) => (
              <div key={review._id} className="flex justify-center">
                <div className="max-w-3xl">
                  <div className="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
                    <div className="md:flex md:flex-row">
                      <div className="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
                        <img
                          src={review.userImg}
                          className="rounded-full shadow-md dark:shadow-black/30"
                          alt="woman avatar"
                        />
                      </div>
                      <div className="md:ml-6">
                        <p className="mb-6 text-lg font-light text-neutral-500 dark:text-neutral-300">
                          {review.review}
                        </p>
                        <p className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                          {review.name}
                        </p>
                        <p className="mb-0 font-semibold text-neutral-500 dark:text-neutral-400">
                          <div className="rating">
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              checked={review.rating === 1}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              checked={review.rating === 2}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              checked={review.rating === 3}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              checked={review.rating === 4}
                            />
                            <input
                              type="radio"
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                              checked={review.rating === 5}
                            />
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        <div className="lg:w-1/3 p-4 md:w-1/2 bg-white flex flex-col  mx-auto">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Write a review
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("name", { required: true })}
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min={0}
                max={5}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register("rating", { required: true })}
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>
              <textarea
                id="review"
                name="review"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                {...register("review", { required: true })}
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-deepblue border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              post review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SinglebookDetails;
