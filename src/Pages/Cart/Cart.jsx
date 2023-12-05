import React from "react";
import HeaderTitle from "../Shared/HeaderTitle/HeaderTitle";
import bookimg from "../../assets/All-Books/book12.jpg";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader/Loader";
import Swal from "sweetalert2";
import useGetCartItem from "../../hooks/useGetCartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const [axiosSecure] = useAxiosSecure();
  const [data, isLoading, error, refetch] = useGetCartItem();
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  let total=0,tax=15;
  if(data.length)
  {
    total = data.reduce((sum, book) => sum + book.bookPrice, 0);
  }
  else{
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

  return (
    <div className="mt-10">
      <HeaderTitle title={`Your Cart(${data.length} items)`}></HeaderTitle>
      <div className="flex justify-center my-6">
        <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
          <div className="flex-1">
            <table className="w-full text-sm lg:text-base" cellSpacing="0">
              <thead>
                <tr className="h-12 uppercase">
                  <th className="text-left">Book Image</th>
                  <th className="text-left">Book Name</th>
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
                {data && data.map((book, index) => (
                  <tr key={index}>
                    <td className="hidden pb-4 md:table-cell">
                      <img
                        src={book.bookCoverPhoto}
                        className="w-20 rounded"
                        alt="Thumbnail"
                      />
                    </td>
                    <td>
                      <p className="mb-2 md:ml-4">{book.name}</p>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="text-gray-700 md:ml-4"
                      >
                        <small>(Remove item)</small>
                      </button>
                    </td>
                    <td className="hidden text-right md:table-cell">
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
                      15€
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

                  <Link to="/payment" className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
