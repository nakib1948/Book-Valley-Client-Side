import React from "react";

const RequestModal = () => {
  return (
    <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full  md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Sign Up
      </h2>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Book Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Book Category</span>
        </label>
        <select className="select select-primary w-full max-w-xs">
              <option disabled selected>
                All Category
              </option>
              <option>ADVENTURE</option>
              <option>FICTION</option>
              <option>ROMANCE</option>
              <option>FANTACY</option>
              <option>RELIGION</option>
              <option>THRILLER</option>
            </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Book Price</span>
        </label>
        <input
          type="number"
          min={0}
          max={100}
          placeholder="Enter the percentage between 1-100 "
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Book Description</span>
        </label>
        <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Book Copy</span>
        </label>
        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
      </div>

      <button className="text-white mt-5 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Send Request
      </button>
      <p className="text-xs text-gray-500 mt-3">
        Literally you probably heard of them jean shorts.
      </p>
    </div>
  );
};

export default RequestModal;
