import { publisherdata } from "./Publiserdata";
import publisherlogo from "../../../../assets/Writer/publisher-logo.jpg";
import facebook from "../../../../assets/Writer/facebook.png";
import instagram from "../../../../assets/Writer/instagram.png";
import twitter from "../../../../assets/Writer/twitter.png";
import linkedin from "../../../../assets/Writer/linkedin.png";
import phone from "../../../../assets/Writer/phone.png";
import location from "../../../../assets/Writer/location.png";
import website from "../../../../assets/Writer/website.png";
import RequestModal from "./RequestPublisher/RequestModal";

const Publisherlist = () => {
  return (
    <div>
      <div className="mb-4 bg-blue-50/40 p-2 rounded-md">
        <h1 className="text-2xl font-semibold">Publisher List</h1>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">Total publishers:</p>
          <input
            type="text"
            placeholder="Search Publisher"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {publisherdata.map((data, index) => (
          <>
            <div
              key={index}
              className="card w-full bg-slate-100 text-gray-700 "
            >
              <div className="card-body">
                <div className="flex justify-evenly">
                  <div className="mr-5">
                    <img src={publisherlogo} className="w-32 rounded " alt="" />
                  </div>
                  <div>
                    <h2 className="card-title">{data.name}</h2>
                    <div className="my-1 flex items-center">
                      <img src={location} alt="" className="inline h-7" />
                      <p className="inline">{data.location}</p>
                    </div>
                    <div className="my-1 flex items-center">
                      <img src={phone} alt="" className="inline h-7" />
                      <p className="inline">{data.phone}</p>
                    </div>
                    <div className="my-1 flex items-center">
                      <img src={website} alt="" className="inline h-6 mr-1 " />
                      <a className="inline text-blue-400">{data.website}</a>
                    </div>
                    <div className="flex">
                      <img src={facebook} className="h-10" alt="" />
                      <img src={twitter} className="h-10 my-1" alt="" />
                      <img src={instagram} className="h-8 mt-1" alt="" />
                      <img src={linkedin} className="h-10" alt="" />
                    </div>
                  </div>
                </div>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                  <button  onClick={()=>document.getElementById(`${index}`).showModal()} className="btn bg-deepblue text-white font-semibold rounded-full">
                    Send Request
                  </button>
                </div>
              </div>
            </div>

            <dialog id={`${index}`} className="modal ">
              <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
                <RequestModal/>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </>
        ))}
      </div>
    </div>
  );
};

export default Publisherlist;
