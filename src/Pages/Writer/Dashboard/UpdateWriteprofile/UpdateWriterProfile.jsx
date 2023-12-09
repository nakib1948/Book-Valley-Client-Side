import { getAuth, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "../../../Shared/UpdatePassword/UpdatePassword";
import HeaderTitle from "../../../Shared/HeaderTitle/HeaderTitle";
import logout from "../../../../assets/Dashboard/logout.png";
import { useForm } from "react-hook-form";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import Loader from "../../../Shared/Loader/Loader";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const UpdateWriterProfile = () => {
  const { user, logOut } = useContext(AuthContext);
  const [data, isLoading, error, refetch] = useGetAllUsers();
  const [axiosSecure] = useAxiosSecure();
  const auth = getAuth();
  const navigate = useNavigate();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const writer = data.find((data) => data.email === user.email);

  const signout = () => {
    logOut().then(() => {
      localStorage.removeItem("access-token");
    });
    navigate("/");
  };

  const onSubmit = (writerData) => {

    if (writerData.image[0]) {
      const formData = new FormData();
      formData.append("image", writerData.image[0]);

      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          const imgURL = imgResponse.data.display_url;

          updateProfile(auth.currentUser, {
            displayName: writerData.name,
            photoURL: imgURL,
          })
            .then(() => {
              const updateWriter = {
                name: writerData.name,
                image: imgURL,
                phone: writerData.phone,
                bankAccount:writerData.bankAccount,
                bankDetails:writerData.bankDetails
              };

              axiosSecure.patch("/postWriterProfileUpdate", updateWriter).then((data) => {
                if (data.data.modifiedCount) {
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Profile updated successfully!!.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  window.location.reload();
                }
              });
            })
            .catch((error) => {});
        })
        .catch((error) => {
          Swal.fire(error.message);
        });
    } else {
      updateProfile(auth.currentUser, {
        displayName: writerData.name,
      })
        .then(() => {
         
          const updateWriter = {
            name: writerData.name,
            image: user.photoURL,
            phone: writerData.phone,
            bankAccount:writerData.bankAccount,
            bankDetails:writerData.bankDetails
          };

          axiosSecure.patch("/postWriterProfileUpdate", updateWriter).then((data) => {
            if (data.data.modifiedCount) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Profile updated successfully!!.",
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.reload();
            }
          });
        })
        .catch((error) => {});
    }
  };
  return (
    <div className="ml-10 mt-10">
      <HeaderTitle title="Update Your Profile"></HeaderTitle>
      <div className="flex justify-end">
        <button onClick={signout} className="btn text-lg font-semibold">
          Logout <img src={logout} className="h-10" alt="" />{" "}
        </button>
      </div>
      <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-deepred text-center">
              Personal Details
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  defaultValue={writer?.name}
                  className="input input-bordered text-base font-bold"
                  {...register("name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Upload Photo</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  {...register("image")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">phone</span>
                </label>
                <input
                  type="text"
                  placeholder="phone"
                  defaultValue={writer.phone}
                  className="input input-bordered text-base font-bold"
                  {...register("phone")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Bank Account</span>
                </label>
                <input
                  type="text"
                  placeholder="bank account"
                  defaultValue={writer.bankAccount}
                  className="input input-bordered text-base font-bold"
                  {...register("bankAccount")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Bank Details</span>
                </label>

                <input
                  placeholder="bank details"
                  defaultValue={writer.bankDetails}
                  className="input input-bordered text-base font-bold"
                  {...register("bankDetails")}
                ></input>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-deepblue font-bold text-lg text-white"
                  type="submit"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>

        <UpdatePassword />
      </div>
    </div>
  );
};

export default UpdateWriterProfile;
