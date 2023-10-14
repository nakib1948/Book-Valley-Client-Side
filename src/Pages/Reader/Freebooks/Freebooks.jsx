import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import adventure from "../../../assets/Home/categories/adventure.jpg";
import reading from "../../../assets/reading.png";
import dlete from "../../../assets/delete.png";


const Freebooks = () => {
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
      <p className="text-4xl font-bold ml-10 mb-10">Free books</p>
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
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10 relative shadow-xl group">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className="rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
              <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-40 group-hover:flex">
                <button className="btn">
                  <img src={reading} className="h-8" alt="" />
                  read
                </button>
                <button className="btn ml-2">
                  <img src={dlete} className="h-8 " alt="" />
                  DELETE
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="card w-80 mb-10  shadow-xl">
              <figure className="px-10 pt-10">
                <img src={adventure} alt="Shoes" className=" rounded-xl h-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">ADVENTURE</h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Freebooks;
