import facebook from "../../../assets/Writer/facebook.png";
import instagram from "../../../assets/Writer/instagram.png";
import twitter from "../../../assets/Writer/twitter.png";
import linkedin from "../../../assets/Writer/linkedin.png";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
const ContactUs = () => {
  return (
    <section className="text-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <HeaderTitle title="Contact Us" description=" We are always waiting to recieve your queston and opinion.please
            feel free to contact with us"></HeaderTitle>
       
        <div className="lg:w-1/2 mt-5 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-lg text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative ">
                <label
                  htmlFor="email"
                  className="leading-7 text-lg text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-lg text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="btn btn-block text-xl text-white btn-primary mt-4">
                Send
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <a className="text-indigo-500">bookvalley@gmail.com</a>
              <p className="leading-normal my-5">
                123 Main Street level-4,buliding-9,Dhaka
                <br />
                Dhaka 56301, Bangladesh
              </p>
              <span className="inline-flex">
                <img src={facebook} alt="" className="inline h-7" />
                <img src={twitter} alt="" className="inline h-7" />
                <img src={instagram} alt="" className="inline h-7" />
                <img src={linkedin} alt="" className="inline h-7" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
