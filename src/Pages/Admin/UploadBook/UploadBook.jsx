import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { storage } from "../../../firebase/firebase.config";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
const maxFileSizeInBytes = 30 * 1024 * 1024;
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const UploadBook = () => {
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
          name:data.name,
          writerName:data.writername,
          description:data.description,
          category:data.category,
          bookCoverPhoto: bookCoverPhoto,
          bookCopy: downloadURL,
        };

        axiosSecure.post("/postFreeBook", uploadBook).then((data) => {
          if (data.data.insertedId) {
            toast.success("book uploaded successfully!", {
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
    <div className="">
      <ToastContainer />
      <HeaderTitle title="upload Free Book"></HeaderTitle>
      <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex">
            <div className="form-control w-full max-w-md lg:w-1/2 lg:pr-2">
              <label className="label">
                <span className="label-text text-lg">Book Name</span>
              </label>
              <input
                type="text"
                placeholder="book name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  name is required
                </small>
              )}
            </div>
            <div className="form-control w-full max-w-md lg:w-1/2 lg:pl-2">
              <label className="label">
                <span className="label-text text-lg">Book Category</span>
              </label>
              <select
                className="select select-primary w-full"
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
                <option>HISTORY</option>
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
          </div>

          <div className="lg:flex">
            <div className="form-control w-full max-w-md lg:w-1/2 lg:pr-2">
              <label className="label">
                <span className="label-text text-lg">Book Cover Photo</span>
              </label>
              <input
                type="file"
                {...register("bookCoverPhoto", { required: true })}
                className="file-input file-input-bordered file-input-primary w-full"
              />
              {errors.photo?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  photo is required
                </small>
              )}
            </div>
            <div className="form-control w-full max-w-md lg:w-1/2 lg:pl-2">
              <label className="label">Upload book pdf file</label>
              <br />
              <input
                type="file"
                required
                className="file-input file-input-bordered file-input-primary w-full"
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
          </div>

          <div className="lg:flex">
            <div className="form-control w-full max-w-md lg:w-1/2 lg:pr-2">
              <label className="label">
                <span className="label-text text-lg">Writer Name</span>
              </label>
              <input
                type="text"
                placeholder="writer name"
                className="input input-bordered w-full"
                {...register("writername", { required: true })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-500" role="alert">
                  {" "}
                  writer name is required
                </small>
              )}
            </div>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text text-lg">Book Description</span>
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
          </div>

          <button
            type="submit"
            className="btn mt-5 btn-block text-xl text-white btn-primary"
          >
            upload
          </button>
        </form>
        ;
      </div>
    </div>
  );
};

export default UploadBook;
