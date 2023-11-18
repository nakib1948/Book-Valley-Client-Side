import Chatmodal from "./Chatmodal";
import { request, chatConversation } from "./requestdata";
import send from "../../../../assets/Writer/send.png";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../Shared/Loader/Loader";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
const RequestFeedback = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure(`/writerrequest/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const chat = async (id) => {
    if (message === "") {
      return toast.warn("write some message", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    const chat = {
      id,
      role: "writer",
      chat: message,
    };
    axiosSecure.patch("/chat", chat).then((data) => {
      if (data.data.modifiedCount) {
        toast.success("message sent", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setMessage("");
        queryClient.invalidateQueries(["chat"]);
      } else {
        toast.warn("Message not sent!Try again", {
          position: "top-center",
          autoClose: 5000,
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

  const writerApproval = (id)=>{
    axiosSecure.patch("/writerapproval", {id}).then((data) => {
      if (data.data.modifiedCount) {
        toast.success("agreement approved", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.warn("somethings wrong!Try again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {data.map((data, index) => (
        <>
          <div key={index} className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Request to {data.publisherName}</h2>
              <p>Book: {data.name}</p>
              <p>Category: {data.category}</p>
              <p>Status: pending</p>
              <div className="card-actions justify-start">
                <button
                  onClick={() =>
                    document.getElementById(`${index}`).showModal()
                  }
                  className="btn btn-outline btn-info"
                >
                  Chat
                </button>

                <button
                  onClick={() =>
                    document.getElementById(`${index + 1}`).showModal()
                  }
                  className="btn btn-outline btn-info"
                >
                  Agreement
                </button>
              </div>
            </div>
          </div>

          <dialog id={`${index}`} className="modal ">
            <ToastContainer />
            <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
              <div className="mb-4  p-2 rounded-md">
                <h1 className="text-2xl text-white text-center font-semibold">
                  Chat with {data.publisherName}
                </h1>
              </div>
              <Chatmodal id={data._id} />
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type here"
                  value={message}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button
                  onClick={() => chat(data._id)}
                  className="btn bg-deepblue text-base font-semibold text-white ml-2"
                >
                  send
                  <img src={send} className="h-6" alt="" />
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          <dialog id={`${index + 1}`} className="modal ">
          <ToastContainer />
            <div className="modal-box w-9/12 max-w-5xl mt-20 h-full bg-gray-500 modal-bottom sm:modal-middle">
              <iframe
                src={data.agreement}
                title="PDF Viewer"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
              <button  disabled={data.writerApproval === "approved"}  onClick={() => writerApproval(data._id)} className="btn btn-block text-xl text-white btn-primary">
                Confrim Agreement
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      ))}
    </div>
  );
};

export default RequestFeedback;
