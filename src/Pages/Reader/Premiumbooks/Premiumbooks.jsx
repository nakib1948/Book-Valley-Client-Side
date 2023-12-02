import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import adventure from "../../../assets/Home/categories/adventure.jpg";
import reading from "../../../assets/reading.png";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import { useContext } from "react";
import { pdfContext } from "../../../Providers/PdfLinkProvider";
const Premiumbooks = () => {
 
  const [axiosSecure] = useAxiosSecure();
  const [booklink, setBookLink] = useContext(pdfContext);
  const navigate = useNavigate()


  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getPaidBook"],
    queryFn: async () => {
      const res = await axiosSecure(`/getPaidBook`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pdflinkClick = async(link)=>{
      await setBookLink(link)
      navigate('/pdfreader')
  }
  console.log(data)
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
  return (
    <div className="pb-10">
      <p className="text-4xl font-bold ml-10 mb-10">Premium books</p>
      <div className="md:ml-10 ml-5 lg:ml-10">
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
        >
          {
             data.map((book,index) =>  <SwiperSlide key={index}>
            
              <div className="card w-80 mb-10 relative shadow-xl group">
                <figure className="px-10 pt-10">
                  <img src={book.bookCoverPhoto} alt="Shoes" className="rounded-xl h-64" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{book.name} by {book.writerName}</h2>
                </div>
                <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-40 group-hover:flex">
                  <button onClick={()=> pdflinkClick(book.bookCopy)} className="btn">
                    <img src={reading} className="h-8" alt="" />
                    read
                  </button>
                </div>
              </div>
            </SwiperSlide>)
          }
         
       
        </Swiper>
      </div>
    </div>
  );
};

export default Premiumbooks;
