import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";

const Chatmodal = ({ id }) => {
  const [axiosSecure] = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["publisherchat"],
    queryFn: async () => {
      const res = await axiosSecure(`/getchat/${id}`);
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
    <div className="overflow-y-scroll scroll-smooth h-80">
      {data.map((chat, index) =>
        chat.role === "writer" ? (
          <div key={index} className="chat chat-start my-1">
            <div className="chat-bubble">{chat.chat}</div>
          </div>
        ) : (
          <div key={index} className="chat my-1 chat-end ">
            <div className="chat-bubble chat-bubble-primary">{chat.chat}</div>
          </div>
        )
      )}
    </div>
  );
};

export default Chatmodal;
