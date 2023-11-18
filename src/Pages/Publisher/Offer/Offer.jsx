import Chatmodal from "./ChatModal";
import {
  request,
  chatConversation,
} from "../../Writer/Dashboard/RequestFeedback/requestdata";
import send from "../../../assets/Writer/send.png";
import Agreement from "./Agreement";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const Offer = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure(`/offertopublisher/${user?.email}`);
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
    if(message ==="")
    {
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
      role: "publisher",
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
        queryClient.invalidateQueries(["publisherchat"]);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {data.map((data, index) => (
        <>
          <div key={index} className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Offer from {data.writerName}</h2>
              <p>Book: {data.name}</p>
              <p>Category: {data.category}</p>
              <p>Earning percentage: {data.percentage}%</p>
              <p>writer approval: {data.writerApproval}</p>
              <p>Status: Pending</p>
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
                  Sent Agreement
                </button>
                <button className="btn btn-outline btn-info">Decline</button>
                <button className="btn btn-outline btn-info">Agreement</button>
                <button disabled={data.writerApproval === "pending"} className="btn btn-outline btn-info">upload book</button>
              </div>
            </div>
          </div>

          <dialog id={`${index}`} className="modal ">
            <ToastContainer />
            <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
              <div className="mb-4  p-2 rounded-md">
                <h1 className="text-2xl text-white text-center font-semibold">
                  Chat with {data.writerName}
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
            <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
              <Agreement id={data._id} percentage={data.percentage}/>
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

export default Offer;
