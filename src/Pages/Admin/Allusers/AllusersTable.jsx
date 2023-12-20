import Swal from "sweetalert2";
import dlete from "../../../assets/delete.png";
import unblock from "../../../assets/admin/unblock.png";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const AllusersTable = ({ user, refetch }) => {
  const [axiosSecure] = useAxiosSecure();
  const blockUser = (id) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to block this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#B85EE6",
      confirmButtonText: "Confirm ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(/postBlockUser/${id}, { block: true })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "user blocked successfully!!",
                showConfirmButton: false,
                timer: 2000,
              });
              refetch();
            }
          });
      }
    });
  };

  const unblockBlockUser = (id) => {
    Swal.fire({
      title: "Warning!",
      text: "Unblock user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91C1C",
      cancelButtonColor: "#B85EE6",
      confirmButtonText: "Confirm ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(/postBlockUser/${id}, { block: false })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "user unblocked successfully!!",
                showConfirmButton: false,
                timer: 2000,
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <tr className="text-base">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={user.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        {user.isDeleted ? (
          <img
            onClick={() => unblockBlockUser(user._id)}
            className="h-8 btn"
            src={unblock}
            alt=""
          />
        ) : (
          <img
            onClick={() => blockUser(user._id)}
            className="h-10 btn"
            src={dlete}
            alt=""
          />
        )}
      </td>
    </tr>
  );
};

export default AllusersTable;