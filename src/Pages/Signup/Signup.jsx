import React, { useContext } from "react";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import img1 from "../../assets/Login&signup/animation_lmjgsrpo.json";
import bg1 from "../../assets/Login&signup/lg-bg.jpg"
import { useForm } from "react-hook-form";
import { getAuth, updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const Signup = () => {
  const { createUser, logOut } = useContext(AuthContext);

  const auth = getAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: data.photo,
        })
        .then(()=>{
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Signup successfull.",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                reset();
                navigate("/");
              });
        })
       
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        Swal.fire(error.message);
      });
  };
  return (
    <div>
      <div
        className="hero min-h-screen bg-base-200"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
        }}
      >
        <Helmet>
          <title>Book Valley | Signup</title>
        </Helmet>
        <div className="hero-content flex-col mt-20 lg:flex-row-reverse">
          <div className="text-center w-1/3 lg:text-left">
            <Lottie animationData={img1} />
          </div>
          <div className="card flex-shrink-0 w-full sm:max-w-sm md:max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-deepred text-center">
                SignUp
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.name?.type === "required" && (
                    <small className="text-red-500" role="alert">
                      {" "}
                      name is required
                    </small>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        // Regular expression for validating email
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <small className="text-red-500" role="alert">
                      {errors.email.message}
                    </small>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                        message:
                          "Password must contain at least one letter, one number, one special character, and be at least 6 characters long",
                      },
                    })}
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <small className="text-red-500" role="alert">
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Photo Url</span>
                  </label>
                  <input
                    type="text"
                    placeholder="url"
                    {...register("photo", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.photo?.type === "required" && (
                    <small className="text-red-500" role="alert">
                      {" "}
                      url is required
                    </small>
                  )}
                  <label className="label">
                    <a href="#" className="label-text text-lg-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn bg-deepblue font-bold text-lg text-white"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
              </form>
              <p className="my-4">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 font-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
