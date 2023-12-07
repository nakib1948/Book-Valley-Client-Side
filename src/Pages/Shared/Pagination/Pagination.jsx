import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="join flex justify-center items-center py-5">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page == currentPage ? "join-item btn bg-deepblue text-white" : "join-item btn"
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;