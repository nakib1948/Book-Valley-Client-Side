import React, { useContext } from "react";
import google from "../../../assets/Login&signup/google.png";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        const saveUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "reader",
          isDeleted:false
        };

        axiosSecure.post("/users", saveUser).then((data) => {
          if (data.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate(from, { replace: true });
          window.location.reload();
        });
       
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="divider">OR</div>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-block bg-deepblue font-bold text-lg text-white"
        >
          Sign In with
          <img className="h-8" src={google} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
