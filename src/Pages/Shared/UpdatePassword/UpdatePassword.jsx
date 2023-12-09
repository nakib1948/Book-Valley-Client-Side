import { getAuth, updatePassword } from "firebase/auth";
import { useState } from "react";
import Swal from "sweetalert2";

const UpdatePassword = () => {
  const [passfield, setpassfield] = useState({
    newpassword: "",
    confrimpassword: "",
  });
  const auth = getAuth();
  const user = auth.currentUser;
  const changePassword = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (passfield.newpassword !== passfield.confrimpassword) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "password donot matched.check confrim password and try again!!.",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (!passwordRegex.test(passfield.newpassword)) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title:
          "Password must contain at least one letter, one number, one special character, and be at least 6 characters long",
        showConfirmButton: false,
        timer: 4000,
      });
    } else {
      const newPassword = passfield.newpassword;

      updatePassword(user, newPassword)
        .then(() => {
          setpassfield({
            newpassword: "",
            confrimpassword: "",
          });
        
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Password updated successfully!!.",
            showConfirmButton: false,
            timer: 3000,
          }).then(()=>{  window.location.reload();})
        })
        .catch((error) => {
          Swal.fire({
            position: "top-center",
            icon: "warning",
            title: error.message,
            showConfirmButton: false,
            timer: 4000,
          });
        });
    }
  };

  return (
    <div className="card flex-shrink-0 h-96 w-full shadow-2xl bg-base-100">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-deepred text-center">
          Change Password
        </h1>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">New Password</span>
          </label>
          <input
            type="password"
            placeholder="new password"
            className="input input-bordered"
            onChange={(event) =>
              setpassfield((prev) => ({
                ...prev,
                newpassword: event.target.value,
              }))
            }
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Confrim Password</span>
          </label>
          <input
            type="password"
            placeholder="confrim password"
            onChange={(event) =>
              setpassfield((prev) => ({
                ...prev,
                confrimpassword: event.target.value,
              }))
            }
            className="input input-bordered"
          />
        </div>

        <div className="form-control mt-6">
          <button
            onClick={() => changePassword()}
            className="btn bg-deepblue font-bold text-lg text-white"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
