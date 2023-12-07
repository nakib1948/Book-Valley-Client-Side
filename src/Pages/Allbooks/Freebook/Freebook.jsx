import { useContext, useState } from "react";
import freebookbg from "../../../assets/All-Books/freebookbg.jpg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import ReactTooltip from "react-tooltip";
import search1 from "../../../assets/All-Books/search.gif";
import publisher from "../../../assets/Dashboard/publisher.png";
import FreebookModal from "./FreebookModal";
import Swal from "sweetalert2";
import Pagination from "../../Shared/Pagination/Pagination";

const Freebook = () => {
  const [search, setSearch] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getFreeBook"],
    queryFn: async () => {
      const res = await axiosSecure(`/getFreeBook`);
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

  const addFreeBookToProfile = (book) => {
    axiosSecure(`/getExistsInFreeBook/${book._id}`).then((res) => {
      if (res.data.exists) return Swal.fire("You already added this book!!!");
      else {
        axiosSecure.patch("/postAddToFreeBook", book).then((data) => {
          if (data.data.modifiedCount) {
            Swal.fire("book added successfully");
          } else {
            Swal.fire("Something went wrong! try again");
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
          Here are the available Free books
        </p>
      </div>

      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-6">
          {currentPosts.map((book, index) => (
            <>
              <div
                key={index}
                className="group relative w-96  bg-base-100 shadow-xl"
              >
                <figure className="px-5">
                  <img
                    src={book.bookCoverPhoto}
                    alt="Shoes"
                    className="rounded-xl w-full h-64"
                  />
                </figure>

                <div className="card-body items-center text-center">
                  <h2 className="card-title">
                    {book.name} by {book.writerName}
                  </h2>

                  <div className="hidden absolute inset-0 flex items-center justify-center  bg-gray-300 bg-opacity-40 group-hover:flex">
                    <button
                      className="btn mr-5"
                      data-for={`cartTooltip-${index}`}
                      data-tip="add to dashboard"
                      onClick={() => addFreeBookToProfile(book)}
                    >
                      <img src={publisher} alt="" />
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
                  </div>
                </div>
              </div>

              <dialog id={`quickview${book._id}`} className="modal ">
                <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
                  <FreebookModal book={book} />
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
        totalPosts={filteredData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default Freebook;
