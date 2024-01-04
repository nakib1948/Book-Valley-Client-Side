import React, { useEffect } from "react";
import HeaderTitle from "../Shared/HeaderTitle/HeaderTitle";
import bookimg from "../../assets/All-Books/book12.jpg";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader/Loader";
import Swal from "sweetalert2";
import useGetCartItem from "../../hooks/useGetCartItem";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import cart from "../../assets/All-Books/cart.png";
import search1 from "../../assets/All-Books/search.gif";
import details from "../../assets/All-Books/details.png";
import premium from "../../assets/All-Books/premium.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Home/FeaturedCollection/Modal";
import useGetUserRole from "../../hooks/useGetUserRole";
import { Helmet } from "react-helmet-async";
const Cart = () => {
  const [axiosSecure] = useAxiosSecure();
  const [data, isLoading, error, refetch] = useGetCartItem();
  const [isRole, isRoleLoading] = useGetUserRole();
  const {
    data: data1,
    isLoading: isLoading1,
    error: error1,
  } = useQuery({
    queryKey: ["getRecommededBook"],
    queryFn: async () => {
      if (data) {
        const queryString = data.map((item) => item.category).join(",");
        const res = await axiosSecure(
          `/getRecommededBook?category=${queryString}`
        );
        return res.data;
      }
    },
    enabled: !isLoading && !!data,
  });

  if (isLoading || isLoading1 || isRoleLoading) {
    return <Loader />;
  }

  if (error || error1) {
    return <div>Error: {error?.message || error1?.message}</div>;
  }
  const recommendedBook = data1?.filter(
    (item1) => !data.some((item) => item.name === item1.name)
  );
  let total = 0,
    tax = 15;
  if (data.length) {
    total = data.reduce((sum, book) => sum + book.bookPrice, 0);
  } else {
    tax = 0;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to remove this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#B85EE6",
      confirmButtonText: "Confirm ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/deleteFromCart/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Removed from the cart!!!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

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
                refetch();
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
    <div className="mt-10">
      <Helmet>
        <title>Book Valley | Cart</title>
      </Helmet>
      <HeaderTitle title={`Your Cart(${data.length} items)`}></HeaderTitle>
      <div className="flex justify-center my-6">
        <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
          <div className="flex-1">
            <div className="overflow-x-auto">
              <table
                className="w-full table text-sm lg:text-base"
                cellSpacing="0"
              >
                <thead>
                  <tr className="h-12 uppercase">
                    <th className="text-left">Book Image</th>
                    <th className="text-left">Book Name</th>
                    <th className="text-left">Category</th>
                    <th className="hidden text-right md:table-cell">Writer</th>
                    <th className="lg:text-right text-left pl-5 lg:pl-0">
                      <span className="lg:hidden" title="Quantity">
                        Qtd
                      </span>
                      <span className="hidden lg:inline">Quantity</span>
                    </th>

                    <th className="text-right"> price</th>
                  </tr>
                </thead>

                <tbody>
                  {data &&
                    data.map((book, index) => (
                      <tr key={index}>
                        <td className="hidden pb-4 md:table-cell">
                          <img
                            src={book.bookCoverPhoto}
                            className="w-20 h-16 rounded"
                            alt="Thumbnail"
                          />
                        </td>
                        <td className="text-left">
                          <p className="mb-2 md:ml-4">{book.name}</p>

                          <button
                            onClick={() => handleDelete(book._id)}
                            className="text-gray-700 md:ml-4"
                          >
                            <small>(Remove item)</small>
                          </button>
                        </td>
                        <td className="text-left md:table-cell">
                          <span className="text-sm lg:text-base font-medium">
                            {book.category}
                          </span>
                        </td>
                        <td className="text-right md:table-cell">
                          <span className="text-sm lg:text-base font-medium">
                            {book.writerName}
                          </span>
                        </td>
                        <td className="justify-center md:justify-end md:flex mt-6">
                          <div className="w-20 h-10">
                            <div className="relative flex flex-row w-full h-8">
                              <input
                                type="number"
                                value="1"
                                className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="text-right">
                          <span className="text-sm lg:text-base font-medium">
                            {book.bookPrice} $
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {data.length === 0 && (
              <h1 className="text-xl font-bold text-center">Cart is empty</h1>
            )}
            <hr className="pb-6 mt-6" />
            <div className="my-4 mt-6 -mx-2 lg:flex">
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Coupon Code</h1>
                </div>
                <div className="p-4">
                  <p className="mb-4 italic">
                    If you have a coupon code, please enter it in the box below
                  </p>
                  <div className="justify-center md:flex">
                    <form action="" method="POST">
                      <div className="flex items-center w-full h-13 pl-3 bg-white border rounded-full">
                        <input
                          type="coupon"
                          name="code"
                          id="coupon"
                          placeholder="Apply coupon"
                          value=""
                          className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
                        />
                        <button
                          type="submit"
                          className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
                        >
                          <svg
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="gift"
                            className="w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                            ></path>
                          </svg>
                          <span className="font-medium">Apply coupon</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="p-4 mt-6 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">
                    Instruction for seller
                  </h1>
                </div>
                <div className="p-4">
                  <p className="mb-4 italic">
                    If you have some information for the seller, you can leave
                    them in the box below
                  </p>
                  <textarea className="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
                </div>
              </div>
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                </div>
                <div className="p-4">
                  <p className="mb-6 italic">
                    additional costs are calculated based on values you have
                    entered
                  </p>
                  <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {total}€
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-b">
                    <div className="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                      Coupon
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700">
                      0€
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Tax
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {tax}€
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {total + tax}€
                    </div>
                  </div>

                  {isRole !== "publisher" &&
                    isRole !== "writer" &&
                    isRole !== "admin" && (
                      <Link
                        to="/payment"
                        className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                      >
                        <svg
                          aria-hidden="true"
                          data-prefix="far"
                          data-icon="credit-card"
                          className="w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0-3.3-2.7-6 6-6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0-12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0-12 5.4 12 12z"
                          ></path>
                        </svg>
                        <span className="ml-2 mt-5px">Proceed to checkout</span>
                      </Link>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {recommendedBook?.length && (
        <>
          <HeaderTitle
            title="Recommended for you"
            description="You may also like these book"
          ></HeaderTitle>
          <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
              {recommendedBook.slice(0, 6).map((book, index) => (
                <>
                  <div
                    key={index}
                    className="group relative w-96  bg-base-100 shadow-xl"
                  >
                    <div className="badge badge-lg">
                      <img src={premium} className="h-7" alt="" />
                    </div>
                    <figure className="px-5">
                      <img
                        src={book.bookCoverPhoto}
                        alt=""
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

                      <div className="hidden absolute inset-0 flex items-center justify-center  bg-gray-300 bg-opacity-40 group-hover:flex">
                        <button
                          className="btn mr-5"
                          data-for={`cartTooltip-${index}`}
                          data-tip="add to cart"
                          onClick={() => addtoCart(book)}
                        >
                          <img src={cart} alt="" />
                        </button>
                        <ReactTooltip
                          id={`cartTooltip-${index}`}
                          place="top"
                          type="dark"
                          effect="solid"
                        />
                        <button
                          className="btn mx-4"
                          data-for={`quickViewTooltip-${index}`}
                          onClick={() =>
                            document
                              .getElementById(`quickview${book._id}`)
                              .showModal()
                          }
                          data-tip="quick view"
                        >
                          <ReactTooltip
                            id={`quickViewTooltip-${index}`}
                            place="top"
                            type="dark"
                            effect="solid"
                          />
                          <img src={search1} className="h-8" alt="" />
                        </button>
                        <Link to={`/allbooks/${book._id}`}>
                          <button
                            className="btn"
                            data-for={`details-${index}`}
                            data-tip="details"
                          >
                            <img src={details} className="h-12" alt="" />
                          </button>
                        </Link>

                        <ReactTooltip
                          id={`details-${index}`}
                          place="top"
                          type="dark"
                          effect="solid"
                        />
                      </div>
                    </div>
                  </div>

                  <dialog id={`quickview${book._id}`} className="modal ">
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
        </>
      )}
    </div>
  );
};

export default Cart;
