import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { storage } from "../../../firebase/firebase.config";
const maxFileSizeInBytes = 30 * 1024 * 1024;
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const UploadBook = ({ id, refetch }) => {
  const [axiosSecure] = useAxiosSecure();
  const [pdfUpload, setPdfUpload] = useState(null);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.bookCoverPhoto[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgResponse) => {
        const bookCoverPhoto = imgResponse.data.display_url;

        if (pdfUpload.size > maxFileSizeInBytes) {
          return;
        }
        const pdfFileName = (await pdfUpload.name) + v4();

        const pdfRef = await ref(storage, `pdf/${pdfFileName}`);

        await uploadBytes(pdfRef, pdfUpload);
        const downloadURL = await getDownloadURL(pdfRef);

        const uploadBook = {
          id,
          bookCoverPhoto: bookCoverPhoto,
          bookCopy: downloadURL,
        };

        axiosSecure.patch("/postuploadbook", uploadBook).then((data) => {
          if (data.data.modifiedCount) {
            toast.success("book copy sent successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            refetch();
            reset();
          } else {
            toast.warn("somethings wrong!Try again", {
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
      });
  };

  return (
    <div className="container   mx-auto flex">
      <Helmet>
        <title>Book Valley | Upload</title>
      </Helmet>
      <ToastContainer />
      <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
          upload book image and pdf
        </h2>
        <p className="leading-relaxed mb-5 text-gray-600">
          After uploading wait for admin approval.If admin approved book will be
          show in the website
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <label className="label">
              <span className="label-text text-lg">book cover Photo</span>
            </label>
            <input
              type="file"
              {...register("bookCoverPhoto", { required: true })}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            {errors.photo?.type === "required" && (
              <small className="text-red-500" role="alert">
                {" "}
                photo is required
              </small>
            )}
          </div>

          <div className="relative mb-4">
            <label className="label">Upload book pdf file</label>
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

export default UploadBook;
