import { request, chatConversation } from "../../Writer/Dashboard/RequestFeedback/requestdata";

const Chatmodal = () => {
  return (
    <div className="overflow-y-scroll h-80">
        
      {chatConversation.map((chat, index) =>
        chat.role === "publisher" ? (
          <div key={index} className="chat chat-start my-1">
            <div className="chat-bubble">
             {chat.message}
            </div>
          </div>
        ) : (
          <div key={index} className="chat my-1 chat-end ">
            <div className="chat-bubble chat-bubble-primary">{chat.message}</div>
          </div>
        )
      )}
    </div>
  );
};

export default Chatmodal;
