import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import book1 from "../../../assets/All-Books/book1.jpg";
import book2 from "../../../assets/All-Books/book2.jpg";
import book3 from "../../../assets/All-Books/book3.jpg";
import book4 from "../../../assets/All-Books/book4.jpg";
import book5 from "../../../assets/All-Books/book5.jpg";
import book6 from "../../../assets/All-Books/book6.jpg";
import book7 from "../../../assets/All-Books/book7.jpg";
import book8 from "../../../assets/All-Books/book8.jpg";
import book9 from "../../../assets/All-Books/book9.jpg";
import book10 from "../../../assets/All-Books/book10.jpg";
import book11 from "../../../assets/All-Books/book11.jpg";
import book12 from "../../../assets/All-Books/book12.jpg";
import cart from "../../../assets/All-Books/cart.png";
import search from "../../../assets/All-Books/search.gif";
import dollar from "../../../assets/All-Books/dollar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const FeaturedCollection = () => {
  const [showButtons, setShowButtons] = useState(false);
  const booksData = [
    {
      booktitle: "The Great Gatsby",
      image: book1,
      price: 10.0,
    },
    {
      booktitle: "To Kill a Mockingbird",
      image: book2,
      price: 10.5,
    },
    {
      booktitle: "1984",
      image: book3,
      price: 11.0,
    },
    {
      booktitle: "Pride and Prejudice",
      image: book4,
      price: 11.5,
    },
    {
      booktitle: "The Catcher in the Rye",
      image: book5,
      price: 12.0,
    },
    {
      booktitle: "The Hobbit",
      image: book6,
      price: 12.5,
    },
    {
      booktitle: "The Lord of the Rings",
      image: book7,
      price: 13.0,
    },
    {
      booktitle: "Harry Potter and the Sorcerer's Stone",
      image: book8,
      price: 13.5,
    },
    {
      booktitle: "The Da Vinci Code",
      image: book9,
      price: 14.0,
    },
    {
      booktitle: "The Shining",
      image: book10,
      price: 14.5,
    },
    {
      booktitle: "The Hunger Games",
      image: book11,
      price: 15.0,
    },
    {
      booktitle: "The Alchemist",
      image: book12,
      price: 15.5,
    },
  ];

  return (
    <div className="my-10">
      <HeaderTitle
        title="Featured Collections"
        description="Browse the collection of our best selling and top interresting products. You will definitely find what you are looking for."
      ></HeaderTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 m-10 gap-6">
        {booksData.map((book, index) => (
          <div
            key={index}
            className="group relative w-96  bg-base-100 shadow-xl"
          >
            <figure className="px-10 pt-10">
              <img src={book.image} alt="Shoes" className="rounded-xl h-64" />
            </figure>

            <div className="card-body items-center text-center">
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
                {book.price} <FontAwesomeIcon icon={faDollarSign} />{" "}
              </p>

              <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-40 group-hover:flex">
                <button className="btn">
                  <img src={cart} alt="" /> add to cart
                </button>
                <button className="btn ml-2">
                  <img src={search} className="h-8" alt="" /> quick view
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollection;
