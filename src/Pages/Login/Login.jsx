import { ToastContainer, toast } from "react-toastify";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import img1 from "../../assets/Login&signup/animation_lmjhirk2.json";
import bg1 from "../../assets/Login&signup/lg-bg.jpg"
import { Helmet } from "react-helmet-async";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const loggedUser = {
          email: user.email,
        };

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire("Please enter correct email and password");
      });
  };
  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
      }}
    >
      <Helmet>
        <title>ArtisticCraftersCorner | Login</title>
      </Helmet>
      <div className="hero-content mt-20 flex-col lg:flex-row-reverse">
        <div className="text-center w-full lg:text-left">
          <Lottie animationData={img1} />
        </div>
        <div className="card flex-shrink-0 w-full sm:max-w-sm md:max-w-md shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">SignIn</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  {...register("email", { required: true, maxLength: 30 })}
                />
                {errors.email?.type === "required" && (
                  <small className="text-red-500" role="alert">
                    {" "}
                    email is required
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
                  name="password"
                  className="input input-bordered"
                  {...register("password", { required: true, maxLength: 30 })}
                />
                {errors.password?.type === "required" && (
                  <small className="text-red-500" role="alert">
                    {" "}
                    password is required
                  </small>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn bg-deepblue font-bold text-lg text-white"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>

            <SocialLogin />
            <p className="my-4">
              Don&rsquo;t have an account?
              <Link to="/usertype" className="text-orange-500 font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
