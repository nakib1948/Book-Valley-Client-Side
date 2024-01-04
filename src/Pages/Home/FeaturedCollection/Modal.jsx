import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import useGetUserRole from "../../../hooks/useGetUserRole";
import Loader from "../../Shared/Loader/Loader";
const Modal = ({ book }) => {
  const [axiosSecure] = useAxiosSecure();
  const [isRole, isRoleLoading] = useGetUserRole();
  if (isRoleLoading) {
    <Loader></Loader>;
  }
  const addtoCart = (data) => {
    axiosSecure(`/existsInPaidbook/${data._id}`).then((res) => {
      if (res.data.exists)
        return toast("You already bought this book!!!", {
          position: "bottom-center",
          autoClose: 2000,
        });
      else {
        axiosSecure(`/existsIncart/${data._id}`).then((res) => {
          if (res.data.exists)
            return toast("You already added this book!!!", {
              position: "bottom-center",
              autoClose: 2000,
            });
          else {
            axiosSecure.patch("/addTocart", data).then((data) => {
              if (data.data.modifiedCount) {
                toast("book added successfully", {
                  position: "bottom-center",
                  autoClose: 2000,
                });
              } else {
                toast("Something went wrong! try again", {
                  position: "bottom-center",
                  autoClose: 2000,
                });
              }
            });
          }
        });
      }
    });
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <ToastContainer />
      <div className="container  mx-auto">
        <div className=" mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className=" w-full  h-64 object-cover object-center rounded"
            src={book.bookCoverPhoto}
          />
          <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Book NAME
            </h2>
            <h1 className="text-white text-3xl title-font font-medium mb-1">
              {book.name}
            </h1>

            <p className="leading-relaxed">{book.description}</p>

            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-white">
                ${book?.bookPrice}
              </span>
              {isRole !== "publisher" &&
                isRole !== "writer" &&
                isRole !== "admin" && (
                  <button
                    onClick={() => addtoCart(book)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add to Cart
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
