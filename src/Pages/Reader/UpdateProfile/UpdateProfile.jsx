import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import logout from "../../../assets/Dashboard/logout.png";
import UpdatePassword from "../../Shared/UpdatePassword/UpdatePassword";
import { Helmet } from "react-helmet-async";
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const UpdateProfile = () => {
  const { user, logOut } = useContext(AuthContext);
  const [imgUpload, setImgUpload] = useState(null);
  const [name, setName] = useState(user?.displayName);
  const [axiosSecure] = useAxiosSecure();
  const auth = getAuth();
  const navigate = useNavigate();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const signout = () => {
    logOut().then(() => {
      localStorage.removeItem("access-token");
    });
    navigate("/");
  };

  const profileUpdate = (e) => {
    e.preventDefault();
    if (imgUpload) {
      const formData = new FormData();
      formData.append("image", imgUpload);

      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          const imgURL = imgResponse.data.display_url;

          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imgURL,
          })
            .then(() => {
              const updateReader = {
                name: name,
                image: imgURL,
              };

              axiosSecure.patch("/updateReader", updateReader).then((data) => {
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
        displayName: name,
      })
        .then(() => {
          const updateReader = {
            name: name,
            image: user.photoURL,
          };

          axiosSecure.patch("/updateReader", updateReader).then((data) => {
            if (data.data.modifiedCount) {
              
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Profile updated successfully!!.",
                showConfirmButton: false,
                timer: 1500,
              })
              window.location.reload();
            }
          });
        })
        .catch((error) => {});
    }
  };
  return (
    <div className="ml-10 mt-10">
       <Helmet>
        <title>Book Valley | Update Profile</title>
 </Helmet>
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
            <form onSubmit={profileUpdate}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  defaultValue={user.displayName}
                  className="input input-bordered text-base font-bold"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Upload Photo</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  onChange={(event) => {
                    setImgUpload(event.target.files[0]);
                  }}
                />
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

         <UpdatePassword/>
      </div>
    </div>
  );
};

export default UpdateProfile;
