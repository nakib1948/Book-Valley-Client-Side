import React from "react";
import { ToastContainer, toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import preview from "../../../assets/admin/preview.png";
import approve from "../../../assets/admin/approve.png";
import dlete from "../../../assets/delete.png";

const BlogRequestTable = ({ request, refetch }) => {
  const [axiosSecure] = useAxiosSecure();

  const adminApproval = (id, status) => {
    let message;
    if (status === "denied") {
      message = "blog denied";
    } else message = "blog approved!";
    const approval = {
      id,
      status,
    };

    axiosSecure.patch("/PostBlogApproval", approval).then((data) => {
      if (data.data.modifiedCount) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      } else {
        toast.warn("operation not successfull!Try again", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  };
  return (
    <>
      <ToastContainer />
      <tr className="text-base">
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={request.blogCoverPhoto}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
          </div>
        </td>
        <td>{request.name}</td>
        <td>{request.writerName}</td>
        <td>{request.email}</td>

        <td className="lg:tooltip" data-tip="Preview">
          <img
            onClick={() => {
              document
                .getElementById(`descriptionModal_${request._id}`)
                .showModal();
            }}
            className="h-10 btn btn-square"
            src={preview}
            alt=""
          />
        </td>

        <td>
          <div className="flex">
            {request.status !== "pending" ? (
              <p className="text-lg text-green-400 font-bold">
                {request.status}
              </p>
            ) : (
              <>
                <img
                  onClick={() => {
                    adminApproval(request._id, "approved");
                  }}
                  className="h-10 btn btn-circle"
                  src={approve}
                  alt=""
                />
                <img
                  onClick={() => {
                    adminApproval(request._id, "denied");
                  }}
                  className="h-10 btn btn-circle"
                  src={dlete}
                  alt=""
                />
              </>
            )}
          </div>
        </td>
      </tr>
      <dialog id={`descriptionModal_${request._id}`} className="modal ">
        <div className="modal-box  modal-bottom sm:modal-middle">
          <div className="">
            <p className="font-serif">{request.description}</p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BlogRequestTable;
