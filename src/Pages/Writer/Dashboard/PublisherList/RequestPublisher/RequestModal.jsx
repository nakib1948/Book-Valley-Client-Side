import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../../../Providers/AuthProvider";
import { storage } from "../../../../../firebase/firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const maxFileSizeInBytes = 30 * 1024 * 1024;
const RequestModal = ({ publisherData }) => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [pdfUpload, setPdfUpload] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (pdfUpload.size > maxFileSizeInBytes) {
      return;
    }
    const pdfFileName = (await pdfUpload.name) + v4();

    const pdfRef = await ref(storage, `pdf/${pdfFileName}`);

    await uploadBytes(pdfRef, pdfUpload);
    const downloadURL = await getDownloadURL(pdfRef);

    const requesttopublisher = {
      name: data.name,
      category: data.category,
      percentage: parseInt(data.percentage),
      description: data.description,
      bookCopy: downloadURL,
      bookCoverPhoto:"",
      bookPrice:0,
      Rating:0,
      writerApproval:"pending",
      status: "pending",
      writerName: user.displayName,
      writerEmail: user.email,
      publisherEmail: publisherData.email,
      publisherName: publisherData.name,
      soldUnit:0,
      chat: [],
      review:[],
      agreement: "",
      bookStatus:"paid",
      withdraw:0
    };

    axiosSecure.post("/requesttopublisher", requesttopublisher).then((data) => {
      if (data.data.insertedId) {
        toast.success("request sent successfully!!!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      }
    });
  };

  return (
    <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full  md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Please fill out the given field
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Book Name</span>
          </label>
          <input
            type="text"
            placeholder="book name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <small className="text-red-500" role="alert">
              {" "}
              name is required
            </small>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Book Category</span>
          </label>
          <select
            className="select select-primary w-full max-w-xs"
            {...register("category", { required: true })}
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
            <option>LITERATURE</option>
            <option>EDUCATIONAL</option>
          </select>
          {errors.category?.type === "required" && (
            <small className="text-red-500" role="alert">
              {" "}
              category is required
            </small>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Book Price</span>
          </label>
          <input
            type="number"
            min={0}
            max={100}
            placeholder="Enter the number of earning percentage you want from each book"
            className="input input-bordered w-full max-w-xs"
            {...register("percentage", { required: true })}
          />
          {errors.percentage?.type === "required" && (
            <small className="text-red-500" role="alert">
              {" "}
              percentage is required
            </small>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Book Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="write description about your book"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description?.type === "required" && (
            <small className="text-red-500" role="alert">
              {" "}
              description is required
            </small>
          )}
        </div>
        <ToastContainer />
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Book Copy</span>
          </label>
          <input
            type="file"
            required
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            placeholder="pdf must be under 30 mb"
            onChange={(event) => {
              setPdfUpload(event.target.files[0]);
            }}
          />
          <small className="text-red-500" role="alert">
            {pdfUpload && pdfUpload.size > maxFileSizeInBytes
              ? "file size must be less than 30 mb"
              : ""}
          </small>
        </div>

        <button
          type="submit"
          className="text-white mt-5 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default RequestModal;
