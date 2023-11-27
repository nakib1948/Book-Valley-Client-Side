import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { request, chatConversation } from "./requestdata";
import Loader from "../../../Shared/Loader/Loader";

const Chatmodal = ({ id }) => {
  const [axiosSecure] = useAxiosSecure();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["chat",id],
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
  console.log(data);
  return (
    <div className="overflow-y-scroll scroll-smooth h-80">
      {data.map((chat, index) =>
        chat.role === "publisher" ? (
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
