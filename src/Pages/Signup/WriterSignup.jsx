import img1 from "../../assets/Login&signup/animation_lmjgsrpo.json";
import Lottie from "lottie-react";
const WriterSignup = () => {
  return (
    <div className="card w-full md:w-11/12 lg:w-11/12 mx-auto lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Lottie animationData={img1} />
      </figure>
      <div className="">
        <section className="text-gray-900 px-2 md:px-10 body-font relative">
          <div className="container py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-5">
              <h1 className="sm:text-3xl text-3xl  font-bold mb-4 text-gray-900">
                Signup
              </h1>
            </div>
            <div className=" mx-auto">
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
                      placeholder=""
                      className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
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
                      placeholder=""
                      className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative ">
                    <label
                      htmlFor="password"
                      className="leading-7 text-lg text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder=""
                      className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative ">
                    <label
                      htmlFor="phone"
                      className="leading-7 text-lg text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative ">
                    <label
                      htmlFor="phone"
                      className="leading-7 text-lg text-gray-600"
                    >
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-info w-full max-w-xs"
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative ">
                    <label
                      htmlFor="account"
                      className="leading-7 text-lg text-gray-600"
                    >
                      Bank Account
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                    />
                  </div>
                </div>

                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="leading-7 text-lg text-gray-600"
                    >
                      Bank Details
                    </label>
                    <textarea placeholder="write your bank account details information" className=" w-full bg-gray-100 bg-opacity-50  textarea textarea-primary" ></textarea>
                  
                  </div>
                </div>
                <div className="p-2 w-full">
                <input
                    type="submit"
                    value="Signup"
                    className="flex mx-auto btn btn-wide bg-deepblue font-bold text-lg text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WriterSignup;
