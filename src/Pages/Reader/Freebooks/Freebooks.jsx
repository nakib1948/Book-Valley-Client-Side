import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import reading from "../../../assets/reading.png";
import dlete from "../../../assets/delete.png";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import Loader from "../../Shared/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { pdfContext } from "../../../Providers/PdfLinkProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Freebooks = () => {
  const [axiosSecure] = useAxiosSecure();
  const [booklink, setBookLink] = useContext(pdfContext);
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getReaderFreeBookItem"],
    queryFn: async () => {
      const res = await axiosSecure(`/getReaderFreeBookItem`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
        axiosSecure.patch(`/deleteFromFreeBook/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Book Removed!!!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const pdflinkClick = async (link) => {
    await setBookLink(link);
    const result = await axiosSecure.put("/booklink", { link });
    navigate("/pdfreader");
  };

  const breakpoints = {
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
  };
  return (
    <div className="pb-10 mt-10">
      <Helmet>
        <title>Book Valley | Freebooks</title>
      </Helmet>
      {data.length ? (
        <>
          {" "}
          <HeaderTitle title="Your Free Books Collections"></HeaderTitle>
          <div className="md:ml-10 ml-5 mt-5 lg:ml-10">
            <Swiper
              grid={{
                rows: 2,
                fill: "row",
              }}
              breakpoints={breakpoints}
              pagination={{
                clickable: true,
              }}
              modules={[Grid, Pagination]}
              className="mySwiper "
              spaceBetween={50}
            >
              {data &&
                data.map((book, index) => (
                  <SwiperSlide key={index}>
                    {" "}
                    <div className="card h-96 w-72 mb-10 relative shadow-xl group">
                      <figure className="px-10 pt-10">
                        <img
                          src={book.bookCoverPhoto}
                          alt="Shoes"
                          className="rounded-xl h-64"
                        />
                      </figure>
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">
                          {book.name} <br /> by {book.writerName}
                        </h2>
                      </div>
                      <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-40 group-hover:flex">
                        <button
                          onClick={() => pdflinkClick(book.bookCopy)}
                          className="btn"
                        >
                          <img src={reading} className="h-8" alt="" />
                          read
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="btn ml-2"
                        >
                          <img src={dlete} className="h-8 " alt="" />
                          DELETE
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <HeaderTitle title="You have no FreeBook Collection"></HeaderTitle>
        </div>
      )}
    </div>
  );
};

export default Freebooks;
