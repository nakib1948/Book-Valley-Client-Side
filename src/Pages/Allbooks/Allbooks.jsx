import Modal from "../Home/FeaturedCollection/Modal";
import Headersection from "./Headersection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import cart from "../../assets/All-Books/cart.png";
import search from "../../assets/All-Books/search.gif";
import details from "../../assets/All-Books/details.png";
import premium from "../../assets/All-Books/premium.png";
import { useEffect, useState } from "react";
import Pagination from "../Shared/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Loader from "../Shared/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useGetUserRole from "../../hooks/useGetUserRole";
import { Helmet } from "react-helmet-async";
const Allbooks = () => {
  const [axiosSecure] = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [isRole, isRoleLoading] = useGetUserRole();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getApprovedBooks"],
    queryFn: async () => {
      const res = await axiosSecure(`/getApprovedBooks`);
      return res.data;
    },
  });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const shuffledData = [...data].sort(() => Math.random() - 0.5);
      setFilteredData(shuffledData);
    }
  }, [data]);

  if (isLoading || isRoleLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSearch = async (selectedCategory, searchInput) => {
    const filtered = await data.filter((book) => {
      if (
        selectedCategory === "All Category" ||
        book.category === selectedCategory
      ) {
        const searchValue = searchInput.toLowerCase();
        return (
          book.name.toLowerCase().includes(searchValue) ||
          book.writerName.toLowerCase().includes(searchValue)
        );
      }
      return false;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const postsPerPage = 9;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData?.slice(firstPostIndex, lastPostIndex);

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
    <div>
      <Helmet>
        <title>Book Valley | Shop</title>
      </Helmet>
      <Headersection handleSearch={handleSearch} />
      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
          {currentPosts &&
            currentPosts.map((book, index) => (
              <>
                <div
                  key={index}
                  className="group relative w-80 md:w-96 lg:w-96 bg-base-100 shadow-xl"
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
                      {isRole !== "publisher" &&
                        isRole !== "writer" &&
                        isRole !== "admin" && (
                          <button
                            className="btn mr-5"
                            data-for={`cartTooltip-${index}`}
                            data-tip="add to cart"
                            onClick={() => addtoCart(book)}
                          >
                            <img src={cart} alt="" />
                          </button>
                        )}

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
                        <img src={search} className="h-8" alt="" />
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
      <Pagination
        totalPosts={filteredData?.length || data.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
      <ReactTooltip />
    </div>
  );
};

export default Allbooks;
