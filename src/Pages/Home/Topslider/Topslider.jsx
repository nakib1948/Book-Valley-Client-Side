import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Topslider = () => {
  const sliderdata = [
    {
      title: "Stories Come to Life",
      description:
        "Immerse yourself in captivating narratives that transport you to different worlds.",
      imageURL: "https://i.ibb.co/CwT8xKW/pngegg.png",
    },
    {
      title: "Discover Your Next Adventure",
      description:
        "Find exciting new tales waiting to be explored within our carefully curated selection.",
      imageURL: "https://i.ibb.co/xgLgHff/1016368-OJK9410-removebg-preview.png",
    },
    {
      title: "Explore Our Book Collection",
      description:
        "Delve into a diverse and rich array of books, from classics to contemporary gems, all in one place.",
      imageURL: "https://i.ibb.co/X52FpPn/pngegg-1.png",
    },
  ];

  return (
    <div  >

  
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
     
    >
      {sliderdata.map((data, index) => (
        <SwiperSlide key={index}>
          <div
            className="hero"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/N686Rcc/library-4317851-1920.jpg)",
            }}
          >
            <div className="hero-overlay min-h-screen  bg-opacity-60"></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
           
            <img src={data.imageURL} className="md:max-w-md sm:max-w-sm" />

              <div className="text-white md:w-1/2 lg:w-1/2 sm:w-full ">
                <h1 className="md:text-5xl sm:text-3xl font-bold">{data.title}</h1>
                <p className="py-6">{data.description}</p>
                <button className="btn btn-primary">Shop Now</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default Topslider;
