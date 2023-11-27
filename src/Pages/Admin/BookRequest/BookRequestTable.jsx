import React from "react";
import dlete from "../../../assets/delete.png";
import { useContext } from "react";
import { pdfContext } from "../../../Providers/PdfLinkProvider";
import preview from "../../../assets/admin/preview.png";
import approve from "../../../assets/admin/approve.png";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";

const BookRequestTable = ({ request, refetch }) => {
  const [booklink, setBookLink] = useContext(pdfContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const bookPreview = async (link) => {
    await setBookLink(link);
    navigate("/pdfreader");
  };

  const adminApproval = (id, status) => {
    let message;
    if (status === "denied") {
      message = "book denied";
    } else message = "book approved!";
    const approval = {
      id,
      status,
    };

    axiosSecure.patch("/PostAdminApproval", approval).then((data) => {
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
                  src={request.bookCoverPhoto}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
          </div>
        </td>
        <td>{request.name}</td>
        <td>{request.writerName}</td>
        <td>{request.publisherName}</td>
        <td className="font-bold">{request.percentage}%</td>
        <td className="lg:tooltip" data-tip="Preview">
          <img
            onClick={() => {
              bookPreview(request.agreement);
            }}
            className="h-10 btn btn-square"
            src={preview}
            alt=""
          />
        </td>
        <td>
          <img
            onClick={() => {
              bookPreview(request.bookCopy);
            }}
            className="h-10 btn btn-square"
            src={preview}
            alt=""
          />
        </td>
        <td>
          <div className="flex">
            {request.status !== "pending" ? (
              <p className="text-lg text-green-400 font-bold">{request.status}</p>
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
    </>
  );
};

export default BookRequestTable;
