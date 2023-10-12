import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay  } from "swiper/modules";
import "./categories.css";
import adventure from "../../../assets/Home/categories/adventure.jpg";
import fiction from "../../../assets/Home/categories/fiction.jpg";
import romance from "../../../assets/Home/categories/romance.jpg";
import fantacy from "../../../assets/Home/categories/fantacy.jpg";
import religion from "../../../assets/Home/categories/religion.jpg";
import thriller from "../../../assets/Home/categories/thriller.jpg";
const Categories = () => {
  return (
    <div  className="categories">
      <p className="text-4xl font-bold ml-10 mb-10">Hot Categories</p>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            768: {
              slidesPerView: 1,
            },
            
            992: {
              slidesPerView: 4,
            },
          }}
        className="mySwiper h-96 b-20"
      >
        <SwiperSlide className="">
          <div className="card w-96  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">ADVENTURE</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-96  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={fiction} alt="Shoes" className="rounded-xl h-64" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">FICTION</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-96  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={romance} alt="Shoes" className="rounded-xl h-64" />
            </figure>
            <div className="card-body  items-center text-center">
              <h2 className="card-title">ROMANCE</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-96  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={fantacy} alt="Shoes" className="rounded-xl h-64" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">FANTACY</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-96  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={religion} alt="Shoes" className="rounded-xl h-64" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">RELIGION</h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-96  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={thriller} alt="Shoes" className="rounded-xl h-64" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">THRILLER</h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Categories;
