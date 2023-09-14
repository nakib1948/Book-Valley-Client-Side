import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
const AutoplaySlider = withAutoplay(AwesomeSlider);
import quote1 from "../../../assets/Home/quote1.svg";
import quote2 from "../../../assets/Home/quote2.svg";
import librarybg from "../../../assets/Home/library-bg.jpg";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
const WebsiteReview = () => {
  const review = [
    {
      name: "Hayat Hossain",
      review:
        "I had a great experience shopping on this website. The selection of books is fantastic, and the prices are competitive. I'll definitely be back for more!",
      rating: 5,
      image: "https://i.ibb.co/D9vVNyC/me.jpg",
    },
    {
      name: "Jane Smith",
      review:
        "This website is a book lover's paradise. I found the book I was looking for, and the checkout process was easy and efficient. Highly recommended!",
      rating: 4,
      image: "https://i.ibb.co/ZW6DnMQ/img9.jpg",
    },
    {
      name: "Bob Johnson",
      review:
        "I've been a loyal customer of this website for years. The customer service is excellent, and they always have the latest bestsellers in stock.",
      rating: 5,
      image: "https://i.ibb.co/fnV3jK1/img7.jpg",
    },
    {
      name: "Alice Brown",
      review:
        "I received my order quickly, and the books were in perfect condition. The website's user interface is user-friendly, making it easy to browse and purchase books.",
      rating: 4,
      image: "https://i.ibb.co/ZL8wWX2/img11.jpg",
    },
    {
      name: "Eva Wilson",
      review:
        "I love the wide variety of genres available on this website. Whether you're into fiction, non-fiction, or sci-fi, they have something for everyone.",
      rating: 5,
      image: "https://i.ibb.co/BT4nqgd/img13.jpg",
    },
  ];

  return (
    <div className="my-10">
      <HeaderTitle
        title="Customer Reviews"
        description="Read what our customers have to say about their book shopping experience."
      ></HeaderTitle>

      <AutoplaySlider
        className="h-[500px] mt-10"
        play={true}
        cancelOnInteraction={false}
        interval={6000}
      >
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
              Testimonials
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <img src={quote2} alt="" />
                  <p className="leading-relaxed text-lg mb-6">
                    I had a great experience shopping on this website. The
                    selection of books is fantastic, and the prices are
                    competitive. I&rsquo;ll definitely be back for more!
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://i.ibb.co/D9vVNyC/me.jpg"
                      className="w-24 h-24 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font text-xl font-medium text-gray-900">
                        Hayat Hossain
                      </span>
                      <div className="rating rating-sm">
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                    </span>
                  </a>
                </div>
              </div>
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <img src={quote2} alt="" />
                  <p className="leading-relaxed text-lg mb-6">
                    This website is a book lover&rsquo;s paradise. I found the
                    book I was looking for, and the checkout process was easy
                    and efficient. Highly recommended!{" "}
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://i.ibb.co/ZW6DnMQ/img9.jpg"
                      className="w-24 h-24 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font text-xl font-medium text-gray-900">
                        Jane Smith
                      </span>
                      <div className="rating rating-sm">
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
              Testimonials
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <img src={quote2} alt="" />
                  <p className="leading-relaxed text-lg mb-6">
                    I&rsquo;ve been a loyal customer of this website for years.
                    The customer service is excellent, and they always have the
                    latest bestsellers in stock.
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://i.ibb.co/fnV3jK1/img7.jpg"
                      className="w-24 h-24 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font text-xl font-medium text-gray-900">
                        Bob Johnson
                      </span>
                      <div className="rating rating-sm">
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                    </span>
                  </a>
                </div>
              </div>
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <img src={quote2} alt="" />
                  <p className="leading-relaxed text-lg mb-6">
                    I received my order quickly, and the books were in perfect
                    condition. The website&rsquo;s user interface is
                    user-friendly, making it easy to browse and purchase books.
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://i.ibb.co/ZL8wWX2/img11.jpg"
                      className="w-24 h-24 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font text-xl font-medium text-gray-900">
                        Alice Brown
                      </span>
                      <div className="rating rating-sm">
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-3xl font-medium title-font text-white mb-12 text-center">
              Testimonials
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <img src={quote2} alt="" />
                  <p className="leading-relaxed text-lg mb-6">
                    I love the wide variety of genres available on this website.
                    Whether you&rsquo;re into fiction, non-fiction, or sci-fi,
                    they have something for everyone.
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://i.ibb.co/BT4nqgd/img13.jpg"
                      className="w-24 h-24 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font text-xl font-medium text-gray-900">
                        Eva Wilson
                      </span>
                      <div className="rating rating-sm">
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                    </span>
                  </a>
                </div>
              </div>
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <img src={quote2} alt="" />
                  <p className="leading-relaxed text-lg mb-6">
                    I&rsquo;ve been a loyal customer of this website for years.
                    The customer service is excellent, and they always have the
                    latest bestsellers in stock.
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://i.ibb.co/tbpTv39/boy-2691493-640.jpg"
                      className="w-24 h-24 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font text-xl font-medium text-gray-900">
                        Sayem Nadim
                      </span>
                      <div className="rating rating-sm">
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-7"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AutoplaySlider>
    </div>
  );
};

export default WebsiteReview;
