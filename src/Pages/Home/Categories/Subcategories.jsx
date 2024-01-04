import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
import freebookbg from "../../../assets/All-Books/freebookbg.jpg";
import Modal from "../FeaturedCollection/Modal";
import ReactTooltip from "react-tooltip";
import Pagination from "../../Shared/Pagination/Pagination";
import cart from "../../../assets/All-Books/cart.png";
import search1 from "../../../assets/All-Books/search.gif";
import details from "../../../assets/All-Books/details.png";
import premium from "../../../assets/All-Books/premium.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const Subcategories = () => {
  const { categoryname } = useParams();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [axiosSecure] = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getBookByCategories"],
    queryFn: async () => {
      const res = await axios(
        `https://book-valley-server-side.vercel.app/getBookByCategories/${categoryname}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const filteredData = !search
    ? data
    : data.filter(
        (book) =>
          book.name.toLowerCase().includes(search.toLowerCase()) ||
          book.writerName.toLowerCase().includes(search.toLowerCase()) ||
          book.category.toLowerCase().includes(search.toLowerCase())
      );

  const postsPerPage = 12;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

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
      <div
        className="relative mb-5 rounded-md"
        style={{
          backgroundImage: `url(${freebookbg})`,
        }}
      >
        <div className="join flex justify-center items-center py-24">
          <input
            className="input input-primary input-bordered join-item lg:w-96"
            name="search"
            placeholder="Search Book by bookname,witername,category"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <button
            onClick={() => setSearch("")}
            className="btn bg-deepblue text-white join-item rounded-r-full"
          >
            Clear
          </button>
        </div>
        <div className="opacity-75 absolute inset-0 pointer-events-none">
          <div className="bg-gradient-to-t from-black via-transparent to-transparent h-full"></div>
        </div>
        <p className="text-3xl font-bold text-center pb-10 text-white relative z-10">
          Here are the available {categoryname.toLowerCase()} books
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
          {currentPosts &&
            currentPosts.map((book, index) => (
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
        <Pagination
        totalPosts={filteredData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default Subcategories;
