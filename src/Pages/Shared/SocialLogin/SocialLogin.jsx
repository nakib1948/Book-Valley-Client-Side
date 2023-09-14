import React, { useContext } from "react";
import google from "../../../assets/Login&signup/google.png";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
          
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
                navigate(from, { replace: true });
            })
          
          
      
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
