import { getAuth, updateProfile } from "firebase/auth";
import UpdatePassword from "../../Shared/UpdatePassword/UpdatePassword";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loader from "../../Shared/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import logout from "../../../assets/Dashboard/logout.png";
import { Helmet } from "react-helmet-async";
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const UpdatePublisherProfile = () => {
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

  const publisher = data.find((data) => data.email === user.email);

  const signout = () => {
    logOut().then(() => {
      localStorage.removeItem("access-token");
    });
    navigate("/");
  };

  const onSubmit = (publisherData) => {
    if (publisherData.image[0]) {
      const formData = new FormData();
      formData.append("image", publisherData.image[0]);

      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          const imgURL = imgResponse.data.display_url;

          updateProfile(auth.currentUser, {
            displayName: publisherData.name,
            photoURL: imgURL,
          })
            .then(() => {
              const updatepublisher = {
                name: publisherData.name,
                image: imgURL,
                phone: publisherData.phone,
                bankAccount: publisherData.bankAccount,
                bankDetails: publisherData.bankDetails,
                location: publisherData.location,
                website: publisherData.website,
                facebook: publisherData.facebook,
                twitter: publisherData.twitter,
                linkedin: publisherData.linkedin,
                instragram: publisherData.instragram,
                description: publisherData.description,
              };

              axiosSecure
                .patch("/postpublisherProfileUpdate", updatepublisher)
                .then((data) => {
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
        displayName: publisherData.name,
      })
        .then(() => {
          const updatepublisher = {
            name: publisherData.name,
            image: user.photoURL,
            phone: publisherData.phone,
            bankAccount: publisherData.bankAccount,
            bankDetails: publisherData.bankDetails,
            location: publisherData.location,
            website: publisherData.website,
            facebook: publisherData.facebook,
            twitter: publisherData.twitter,
            linkedin: publisherData.linkedin,
            instragram: publisherData.instragram,
            description: publisherData.description,
          };

          axiosSecure
            .patch("/postpublisherProfileUpdate", updatepublisher)
            .then((data) => {
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  defaultValue={publisher?.name}
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
                  defaultValue={publisher.phone}
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
                  defaultValue={publisher.bankAccount}
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
                  defaultValue={publisher.bankDetails}
                  className="input input-bordered text-base font-bold"
                  {...register("bankDetails")}
                ></input>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Location</span>
                </label>

                <input
                  placeholder="location"
                  defaultValue={publisher.location}
                  className="input input-bordered text-base font-bold"
                  {...register("location")}
                ></input>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Website</span>
                </label>

                <input
                  placeholder="website"
                  defaultValue={publisher.website}
                  className="input input-bordered text-base font-bold"
                  {...register("website")}
                ></input>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Facebook</span>
                </label>

                <input
                  placeholder="facebook"
                  defaultValue={publisher.facebook}
                  className="input input-bordered text-base font-bold"
                  {...register("facebook")}
                ></input>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Twitter</span>
                </label>

                <input
                  placeholder="twitter"
                  defaultValue={publisher.twitter}
                  className="input input-bordered text-base font-bold"
                  {...register("twitter")}
                ></input>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Linkedin</span>
                </label>

                <input
                  placeholder="linkedin"
                  defaultValue={publisher.linkedin}
                  className="input input-bordered text-base font-bold"
                  {...register("linkedin")}
                ></input>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Instragram</span>
                </label>

                <input
                  placeholder="instragram"
                  defaultValue={publisher.instragram}
                  className="input input-bordered text-base font-bold"
                  {...register("instragram")}
                ></input>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Description</span>
                </label>

                <input
                  placeholder="description"
                  defaultValue={publisher.description}
                  className="input input-bordered text-base font-bold"
                  {...register("description")}
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

export default UpdatePublisherProfile;
