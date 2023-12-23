import { useQuery } from "@tanstack/react-query";
import blog1 from "../../../assets/Home/blog1.jpg";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import Loader from "../../Shared/Loader/Loader";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getAllBlog"],
    queryFn: async () => {
      const res = await axios(`https://horse-raincoat.cyclic.app/getAllBlog`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

 
  return (
    <div className="mt-24 ">
      <HeaderTitle
        title="LATEST BLOG"
        description=" Explore our newest blog posts to stay updated with the latest insights, trends, and information."
      ></HeaderTitle>
      
      <Slider {...settings} >
              {
                data.map((data,index)=> 
                <section key={index} className="w-full md:w-1/2 lg:w-1/2 text-gray-600 mt-5 body-font">
                  <div  className="container px-5 mx-auto">
              
                  <div className="p-4 w-full">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={data.blogCoverPhoto}
                        alt="blog"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          {data.date}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {data.name}
                        </h1>
                        <p className="leading-relaxed mb-3">
                          {
                              data.description.slice(0,120)
                          } <span className="font-bold">. . . . . .</span> 
                        </p>
                        <div className="flex items-center flex-wrap">
                          <Link to={`/blog/${data._id}`} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            See More
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              data-darkreader-inline-stroke=""
                              style={{ "--darkreader-inline-stroke": "currentColor" }}
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                            </Link> 
                          <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg
                              className="w-4 h-4 mr-1"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                              data-darkreader-inline-stroke=""
                              style={{ "--darkreader-inline-stroke": "currentColor" }}
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            1.2K
                          </span>
                          <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                            <svg
                              className="w-4 h-4 mr-1"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                              data-darkreader-inline-stroke=""
                              style={{ "--darkreader-inline-stroke": "currentColor" }}
                            >
                              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>
                            6
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
              
              
              </div>
               </section>
              )
              }

        </Slider>
     
    </div>
  );
};

export default Blog;
