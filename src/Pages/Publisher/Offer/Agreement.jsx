import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {  useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { storage } from "../../../firebase/firebase.config";
const maxFileSizeInBytes = 30 * 1024 * 1024;

const Agreement = ({ id, percentage }) => {
  const [axiosSecure] = useAxiosSecure();
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

    const agreement = {
      id,
      percentage: parseInt(data.percentage),
      bookPrice: parseInt(data.bookPrice),
      agreement: downloadURL,
    };

    axiosSecure.patch("/postagreement", agreement).then((data) => {
      if (data.data.modifiedCount) {
        toast.success("agreement sent", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      } else {
        toast.warn("Agreement not sent!Try again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  };

  return (
    <div className="container   mx-auto flex">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
          Agreement
        </h2>
        <p className="leading-relaxed mb-5 text-gray-600">
          Make an agreement paper and sent it to the writer.If writer approved
          prepare the book and sent the copy to admin.Wait for admin approval
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Edit percentage
            </label>
            <input
              type="number"
              id="percentage"
              defaultValue={percentage}
              name="percentage"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              {...register("percentage", { required: true })}
              // onChange={(e)=>{setBookPercentage(e.target.value)}}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Book Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              {...register("bookPrice", { required: true })}
            />
            {errors.bookPrice?.type === "required" && (
              <small className="text-red-500" role="alert">
                {" "}
                enter book price
              </small>
            )}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Agreement
            </label>
            <br />
            <input
              type="file"
              required
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              placeholder="upload agreement"
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
            className="btn btn-block text-xl text-white btn-primary"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Agreement;
