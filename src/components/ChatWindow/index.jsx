import { useState } from "react";
import { useChats } from "../../contexts/ChatsContext";
import "./ChatWindow.css";
import { LuSendHorizonal } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import ChatBubble from "../ChatBubble";
import { useUser } from "../../contexts/UserContext";

function ChatWindow() {
  const {
    selectedRoom,
    messageList,
    onRoomSelected,
    sendMessage,
    resetMessages,
    chatIsLoading,
  } = useChats();
  const { user } = useUser;
  const [text, setText] = useState("");

  console.log(user);
  if (!selectedRoom) return null;

  console.log("messages", messageList);

  function closeRoom() {
    onRoomSelected(null);
    resetMessages();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    sendMessage(text);
  }

  return (
    <div className="chat-window">
      <div className="chats-header chat-window-header">
        <span>
          {selectedRoom.user.first_name} {selectedRoom.user.last_name}
        </span>
        <FaXmark onClick={closeRoom} />
      </div>
      <div className="chats-window-body">
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
              isSelf={msg.user_sent !== user?.user_id}
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
    </div>
  );
}

export default ChatWindow;
