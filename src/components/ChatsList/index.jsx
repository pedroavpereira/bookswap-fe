import { useState } from "react";
import "./ChatList.css";
import { useChats } from "../../contexts/ChatsContext";
import ChatRoom from "../ChatRoom";
function ChatsList() {
  const { rooms, onRoomSelected } = useChats();
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen((s) => !s);
  }
  return (
    <div className="chats-container">
      <div className="chats-header" onClick={toggleIsOpen}>
        Chats
      </div>
      {isOpen && (
        <div className="chats-body">
          {rooms?.map((room) => (
            <ChatRoom room={room} key={room.id} onClick={onRoomSelected} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatsList;
