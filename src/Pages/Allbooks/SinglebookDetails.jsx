import book from "../../assets/All-Books/book1.jpg";

const SinglebookDetails = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Animated Night Hill Illustrations
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Description
                </a>
              </div>
              <p className="leading-relaxed mb-4">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean.
              </p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Color</span>
                <span className="ml-auto text-gray-900">Blue</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">Medium</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Quantity</span>
                <span className="ml-auto text-gray-900">4</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  $58.00
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={book}
            />
          </div>
        </div>
      </section>

      <div className="  text-indigo-500 text-center border-b-4 border-indigo-500 py-2 mb-5 text-2xl font-semibold max-w-sm  mx-auto">
        Reviews
      </div>

      <div className="flex flex-wrap">
        <section className="rounded-md text-center md:text-left">
          <div className="flex justify-center">
            <div className="max-w-3xl">
              <div className="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
                <div className="md:flex md:flex-row">
                  <div className="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
                    <img
                      src="https://i.ibb.co/tbpTv39/boy-2691493-640.jpg"
                      className="rounded-full shadow-md dark:shadow-black/30"
                      alt="woman avatar"
                    />
                  </div>
                  <div className="md:ml-6">
                    <p className="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Id quam sapiente molestiae numquam quas, voluptates omnis
                      nulla ea odio quia similique corrupti magnam.
                    </p>
                    <p className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                      Anna Smith
                    </p>
                    <p className="mb-0 font-semibold text-neutral-500 dark:text-neutral-400">
                      Product manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-3xl">
              <div className="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
                <div className="md:flex md:flex-row">
                  <div className="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
                    <img
                      src="https://i.ibb.co/tbpTv39/boy-2691493-640.jpg"
                      className="rounded-full shadow-md dark:shadow-black/30"
                      alt="woman avatar"
                    />
                  </div>
                  <div className="md:ml-6">
                    <p className="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Id quam sapiente molestiae numquam quas, voluptates omnis
                      nulla ea odio quia similique corrupti magnam.
                    </p>
                    <p className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                      Anna Smith
                    </p>
                    <p className="mb-0 font-semibold text-neutral-500 dark:text-neutral-400">
                      Product manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col  mx-10">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Write a review
          </h2>

          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button className="text-white bg-deepblue border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            post review
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglebookDetails;
