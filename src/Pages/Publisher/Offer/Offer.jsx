import Chatmodal from "./ChatModal";
import { request, chatConversation } from "../../Writer/Dashboard/RequestFeedback/requestdata";
import send from "../../../assets/Writer/send.png";
import Agreement from "./Agreement";

const Offer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {request.map((data, index) => (
        <>
          <div key={index} className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Offer from Hayat Hossain</h2>
              <p>Book: {data.bookName}</p>
              <p>Category: {data.bookCategory}</p>
              <p>Earning percentage: {data.bookPercentage}</p>
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
                <button onClick={() =>
                    document.getElementById(`${index + 1}`).showModal()
                  } className="btn btn-outline btn-info">Sent Agreement</button>
                <button   className="btn btn-outline btn-info">Decline</button>
                
              </div>
            </div>
          </div>

          <dialog id={`${index}`} className="modal ">
            <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
              <div className="mb-4  p-2 rounded-md">
                <h1 className="text-2xl text-white text-center font-semibold">
                  Chat with Ankur prokashoni
                </h1>
              </div>
              <Chatmodal />
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <button className="btn bg-deepblue text-base font-semibold text-white ml-2">
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
              
              <Agreement/>
              
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
