import { useState } from "react";
import allbookbg from "../../assets/All-Books/allbookbg.jpg";
import { TypeAnimation } from "react-type-animation";
const Headersection = ({ handleSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchInput, setSearchInput] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(selectedCategory, searchInput);
  };

  return (
    <section
      className="body-font bg-cover "
      style={{ backgroundImage: `url(${allbookbg})` }}
    >
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <TypeAnimation
            sequence={[
              "The easiest way to find any book.",
              2000,
              "Finding any book becomes a breeze with the easiest method",
              2000,
              "The most effortless approach to locate any book effortlessly",
              2000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2.5em", display: "inline-block" }}
            repeat={Infinity}
            className="font-bold text-white"
          />
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <select
              className="select select-primary w-full max-w-xs"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option selected>All Category</option>
              <option>ADVENTURE</option>
              <option>FICTION</option>
              <option>ROMANCE</option>
              <option>FANTACY</option>
              <option>RELIGION</option>
              <option>THRILLER</option>
              <option>HISTORY</option>
              <option>EDUCATIONAL</option>
            </select>
          </div>
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="search book or author"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={handleInputChange}
              value={searchInput}
            />
          </div>
          <button
            onClick={handleSearchClick}
            className="text-white bg-deepblue border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Headersection;
