import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import { useContext } from "react";
import useGetAllBooks from "../../../../hooks/useGetAllBooks";
import HeaderTitle from "../../../Shared/HeaderTitle/HeaderTitle";
import Loader from "../../../Shared/Loader/Loader";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { pdfContext } from "../../../../Providers/PdfLinkProvider";
import { useNavigate } from "react-router-dom";
import reading from "../../../../assets/reading.png";

const WriterBooks = () => {
  const [data, isLoading, error, refetch] = useGetAllBooks();
  const { user } = useContext(AuthContext);
  const [booklink, setBookLink] = useContext(pdfContext);
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pdflinkClick = async (link) => {
    await setBookLink(link);
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
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  };

  const writerbooks = data.filter((data) => data.writerEmail === user.email && data.status==='approved');
 

  return (
    <div className="pb-10 mt-10 ">
      {writerbooks.length ? (
        <>
          {" "}
          <HeaderTitle title="Your Published Books"></HeaderTitle>
          <div className="md:ml-10 mt-5 ml-5 lg:ml-10">
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
              spaceBetween={100}
            >
              {writerbooks.map((book, index) => (
                <SwiperSlide key={index}>
                  <div className="card h-96 w-80 mb-10 relative shadow-xl group">
                    <figure className="px-10 pt-10">
                      <img
                        src={book.bookCoverPhoto}
                        alt="Shoes"
                        className="rounded-xl h-64"
                      />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">
                        {book.name} 
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
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>{" "}
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <HeaderTitle title="You have no published book yet"></HeaderTitle>
        </div>
      )}
    </div>
  );
};

export default WriterBooks;
