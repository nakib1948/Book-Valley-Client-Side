import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import cart from "../../../assets/All-Books/cart.png";
import search from "../../../assets/All-Books/search.gif";
import dollar from "../../../assets/All-Books/dollar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useGetUserRole from "../../../hooks/useGetUserRole";

const FeaturedCollection = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isRole, isRoleLoading] = useGetUserRole();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getApprovedBooks"],
    queryFn: async () => {
      const res = await axiosSecure(`/getApprovedBooks`);
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
  return (
    <div className="my-10">
      <HeaderTitle
        title="Featured Collections"
        description="Browse the collection of our best selling and top interesting books. You will definitely find what you are looking for."
      ></HeaderTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
        {data.slice(0, 12).map((book, index) => (
          <>
            <div
              key={index}
              className="group relative w-80 md:w-96 lg:w-96  bg-base-100 shadow-xl"
            >
              <figure className="px-10 pt-10">
                <img
                  src={book.bookCoverPhoto}
                  alt="books"
                  className="rounded-xl mx-auto h-64"
                />
              </figure>

              <div className="card-body items-center text-center">
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
                <h2 className="card-title">
                  {book.name} by {book.writerName}
                </h2>
                <p className="text-lg font-bold">
                  {book.bookPrice} <FontAwesomeIcon icon={faDollarSign} />{" "}
                </p>

                <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-40 group-hover:flex">
                  {
                     isRole !== "publisher" && isRole !== "writer" && isRole !== "admin" &&
                     <button className="btn" onClick={() => addtoCart(book)}>
                    <img src={cart} alt="" /> add to cart
                  </button>
                  }
                  
                  <button
                    className="btn ml-2"
                    onClick={() =>
                      document.getElementById(`${index}`).showModal()
                    }
                  >
                    <img src={search} className="h-8" alt="" /> quick view
                  </button>
                </div>
              </div>
            </div>
            <dialog id={`${index}`} className="modal ">
              <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
                <Modal book={book} />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollection;
