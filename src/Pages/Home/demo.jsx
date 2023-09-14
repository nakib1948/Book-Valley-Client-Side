import React from "react";


const Demo = () => {
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
        {booksData.map((book, index) => (
          <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a
              className="block relative h-48 rounded overflow-hidden"
              onMouseEnter={() => setShowButtons(true)}
              onMouseLeave={() => setShowButtons(false)}
            >
              <img
                alt="ecommerce"
                className="object-cover object-center w-full h-full block"
                src={book.image}
              />
              <div
                className={`hidden absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-40 ${
                  showButtons ? 'flex' : ''
                }`}
              >
                <button className="btn">
                  <img src={cart} alt="" /> add to cart
                </button>
                <button className="btn ml-2">
                  <img src={search} className="h-8" alt="" /> quick view
                </button>
              </div>
            </a>
            <div className="mt-4">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
              <h2 className="card-title">{book.booktitle}</h2>
              <p className="text-lg font-bold">
                {book.price} <FontAwesomeIcon icon={faDollarSign} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Demo;
