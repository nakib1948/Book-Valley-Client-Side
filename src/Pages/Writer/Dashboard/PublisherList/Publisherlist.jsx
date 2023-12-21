import { publisherdata } from "./Publiserdata";
import { useQuery } from "@tanstack/react-query";
import publisherlogo from "../../../../assets/Writer/publisher-logo.jpg";
import facebook from "../../../../assets/Writer/facebook.png";
import instagram from "../../../../assets/Writer/instagram.png";
import twitter from "../../../../assets/Writer/twitter.png";
import linkedin from "../../../../assets/Writer/linkedin.png";
import phone from "../../../../assets/Writer/phone.png";
import location from "../../../../assets/Writer/location.png";
import website from "../../../../assets/Writer/website.png";
import RequestModal from "./RequestPublisher/RequestModal";
import Loader from "../../../Shared/Loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Publisherlist = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const res = await axiosSecure("/allpublisher");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="mb-4 bg-blue-50/40 p-2 rounded-md">
        <h1 className="text-2xl font-semibold">Publisher List</h1>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">Total publishers: {data.length}</p>
          <input
            type="text"
            placeholder="Search Publisher"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data.map((data, index) => (
          <>
            <div
              key={index}
              className="card w-full bg-slate-100 text-gray-700 "
            >
              <div className="card-body">
                <div className="flex justify-evenly">
                  <div className="mr-5">
                    <img src={data.image} className="w-32 rounded " alt="" />
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
                      <a href={data.facebook}>
                        <img src={facebook} className="h-10" alt="" />
                      </a>
                      <a href={data.twitter}>
                        <img src={twitter} className="h-10 my-1" alt="" />
                      </a>
                      <a href={data.instagram}>
                        <img src={instagram} className="h-8 mt-1" alt="" />
                      </a>
                      <a href={data.linkedin}>
                        <img src={linkedin} className="h-10" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() =>
                      document.getElementById(`${index}`).showModal()
                    }
                    className="btn bg-deepblue text-white font-semibold rounded-full"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>

            <dialog id={`${index}`} className="modal ">
              <div className="modal-box bg-gray-900 modal-bottom sm:modal-middle">
                <RequestModal publisherData={data} />
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
