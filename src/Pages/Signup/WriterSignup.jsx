import { useContext } from "react";
import img1 from "../../assets/Login&signup/animation_lmjgsrpo.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const WriterSignup = () => {
    const { createUser, logOut } = useContext(AuthContext);
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
  
    const onSubmit = (data) => {
      const formData = new FormData();
      formData.append("image", data.profilePhoto[0]);
  
      fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          const imgURL = imgResponse.data.display_url;
          createUser(data.email, data.password)
            .then((result) => {
              updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: imgURL,
              })
                .then(() => {
                  const saveUser = {
                    name: data.name,
                    email: data.email,
                    image: imgURL,
                    bankAccount:data.bankAccount,
                    bankDetails:data.bankDetails,
                    phone:data.phone,
                    role: "writer",
                  };
  
                  axiosSecure.post("/users", saveUser).then((data) => {
                    if (data.data.insertedId) {
                      Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Signup successfull.",
                        showConfirmButton: false,
                        timer: 1500,
                      }).then(() => {
                        reset();
                        navigate("/");
                        window.location.reload();
                      });
                    }
                  });
                })
                .catch((error) => {
                });
            })
            .catch((error) => {
              Swal.fire(error.message);
            });
        });
    };

  return (
    <div className="card w-full md:w-11/12 lg:w-11/12 mx-auto lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Lottie animationData={img1} />
      </figure>
      <div className="">
        <section className="text-gray-900 px-2 md:px-10 body-font relative">
          <div className="container py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-5">
              <h1 className="sm:text-3xl text-3xl  font-bold mb-4 text-gray-900">
                Signup
              </h1>
            </div>
            <div className=" mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-lg text-gray-600"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        {...register("name", { required: true })}
                        className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                      />
                      {errors.name?.type === "required" && (
                        <small className="text-red-500" role="alert">
                          {" "}
                          name is required
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative ">
                      <label
                        htmlFor="email"
                        className="leading-7 text-lg text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder=""
                        className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <small className="text-red-500" role="alert">
                          {errors.email.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="p-2 w-1/2">
                    <div className="relative ">
                      <label
                        htmlFor="password"
                        className="leading-7 text-lg text-gray-600"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder=""
                        className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                            message:
                              "Password must contain at least one letter, one number, one special character, and be at least 6 characters long",
                          },
                        })}
                      />
                      {errors.password && (
                        <small className="text-red-500" role="alert">
                          {errors.password.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="p-2 w-1/2">
                    <div className="relative ">
                      <label
                        htmlFor="phone"
                        className="leading-7 text-lg text-gray-600"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                        {...register("phone", { required: true })}
                      />
                      {errors.phone?.type === "required" && (
                        <small className="text-red-500" role="alert">
                          {" "}
                          phone number is required
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="p-2 w-1/2">
                    <div className="relative ">
                      <label
                        htmlFor="photo"
                        className="leading-7 text-lg text-gray-600"
                      >
                        Profile Photo
                      </label>
                      <input
                        type="file"
                        className="file-input file-input-bordered file-input-info w-full max-w-xs"
                        {...register("profilePhoto", { required: true })}
                      />
                      {errors.profilePhoto?.type === "required" && (
                        <small className="text-red-500" role="alert">
                          {" "}
                          profile picture is required
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="p-2 w-1/2">
                    <div className="relative ">
                      <label
                        htmlFor="account"
                        className="leading-7 text-lg text-gray-600"
                      >
                        Bank Account
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="input bg-gray-100 bg-opacity-50 input-bordered input-primary w-full max-w-xs"
                        {...register("bankAccount", { required: true })}
                      />
                      {errors.bankAccount?.type === "required" && (
                        <small className="text-red-500" role="alert">
                          {" "}
                          bank account is required
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="bankDetails"
                        className="leading-7 text-lg text-gray-600"
                      >
                        Bank Details
                      </label>
                      <textarea
                        {...register("bankDetails", { required: true })}
                        placeholder="write your bank account details information"
                        className=" w-full bg-gray-100 bg-opacity-50  textarea textarea-primary"
                      ></textarea>
                      {errors.bankDetails?.type === "required" && (
                        <small className="text-red-500" role="alert">
                          {" "}
                          bankDetails is required
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <input
                      type="submit"
                      value="Signup"
                      className="flex mx-auto btn btn-wide bg-deepblue font-bold text-lg text-white"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WriterSignup;
