import { useState } from "react";
import allbookbg from "../../assets/All-Books/allbookbg.jpg";
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
          <h1 className="text-3xl md:text-5xl lg:text-5xl  font-bold title-font mb-4 text-white">
            The easiest way to find any book.
          </h1>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
         
            <select className="select select-primary w-full max-w-xs"
             onChange={handleCategoryChange}
             value={selectedCategory}
            >
              <option disabled selected>
                All Category
              </option>
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
          <button onClick={handleSearchClick} className="text-white bg-deepblue border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Headersection;
