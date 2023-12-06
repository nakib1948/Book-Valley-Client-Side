import { useState } from "react";
import freebookbg from "../../../assets/All-Books/freebookbg.jpg"

const Freebook = () => {
    const [search, setSearch] = useState("");
    return (
        <div>
              <div
          className="relative mb-5 rounded-md"
          style={{
            backgroundImage: `url(${freebookbg})`,
            
          }}
        >
          <div className="join flex justify-center items-center py-24">
            <input
              className="input input-primary input-bordered join-item lg:w-96"
              name="search"
              placeholder="Search Book..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <button
              onClick={() => setSearch("")}
              className="btn bg-deepblue text-white join-item rounded-r-full"
            >
              Clear
            </button>
          </div>
          <div className="opacity-75 absolute inset-0 pointer-events-none">
            <div className="bg-gradient-to-t from-black via-transparent to-transparent h-full"></div>
          </div>
          <p className="text-3xl font-bold text-center pb-10 text-white relative z-10">
            Here are the available Free books
          </p>
        </div>

        </div>
    );
};

export default Freebook;