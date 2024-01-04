import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
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
    <div>
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

                <div className="text-white md:w-1/2 lg:w-1/2 sm:w-full "
                  data-aos="fade-right"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <TypeAnimation
                    sequence={[
                      "Stories Come to Life",
                      1000, 
                      "Discover Your Next Adventure",
                      1000,
                      "Explore Our Book Collection",
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: "3em", display: "inline-block" }}
                    repeat={Infinity}
                  />

                  <p className="py-6 text-base">{data.description}</p>
                  <Link
                    to="/allbooks"
                    className="btn bg-deepblue text-white rounded-full"
                  >
                    Shop Now
                  </Link>
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
