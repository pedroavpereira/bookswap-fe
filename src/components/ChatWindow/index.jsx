import "./ChatWindow.css";
import { useEffect, useRef, useState } from "react";
import { useChats } from "../../contexts/ChatsContext";
import { LuSendHorizonal } from "react-icons/lu";
import ChatBubble from "../ChatBubble";
import { useUser } from "../../contexts/UserContext";

function ChatWindow() {
  const { selectedRoom, messageList, sendMessage, chatIsLoading, markAsRead } =
    useChats();
  const { user } = useUser();
  const ref = useRef();
  const [text, setText] = useState("");

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(
    function () {
      if (ref.current && messageList.length > 0) {
        console.log("ref");
        ref.current.scroll(0, ref.current.scrollHeight);
      }
      scrollToBottom();
    },
    [messageList]
  );

  if (!selectedRoom) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    sendMessage(text);
    setText("");
  }

  function handleClick() {
    console.log("handleClick");
    markAsRead();
  }

  return (
    <div onClick={handleClick}>
      <div className="chats-body" ref={ref}>
        {chatIsLoading && (
          <div className="spinner-chat-window-background">
            <div className="spinner"></div>
          </div>
        )}
        {!chatIsLoading && (
          <div className="chat-messages">
            {messageList?.map((msg, i) => (
              <ChatBubble
                key={i}
                message={msg.message}
                isSelf={msg.user_sent === user?.user_id}
              />
            ))}
          </div>
        )}
      </div>
      <form onClick={handleSubmit} className="chat-window-inputs">
        <input
          className="chat-inputs-input chat-inputs"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="chat-inputs-send chat-inputs">
          <LuSendHorizonal />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;

{
  /* <div className="chat-window" onClick={markAsRead}>
      <div className="chats-header chat-window-header">
        <span>
          {selectedRoom.user.first_name} {selectedRoom.user.last_name}
        </span>
        <FaXmark onClick={closeRoom} />
      </div>
      <div className="chats-window-body" ref={ref}>
        {chatIsLoading && (
          <div className="spinner-chat-window-background">
            <div className="spinner"></div>
          </div>
        )}
        {!chatIsLoading &&
          messageList?.map((msg, i) => (
            <ChatBubble
              key={i}
              message={msg.message}
              isSelf={msg.user_sent === user?.user_id}
            />
          ))}
      </div>
      <form onClick={handleSubmit} className="chat-window-inputs">
        <input
          className="chat-inputs-input chat-inputs"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="chat-inputs-send chat-inputs">
          <LuSendHorizonal />
        </button>
      </form>
    </div> */
}
