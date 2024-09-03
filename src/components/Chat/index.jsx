import { useState } from "react";
import { useChats } from "../../contexts/ChatsContext";
import ChatRoom from "../ChatRoom";
import ChatHeader from "../ChatHeader";
import ChatWindow from "../ChatWindow";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

function Chat() {
  const { rooms, onRoomSelected, selectedRoom, resetMessages } = useChats();
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    onRoomSelected(null);
    resetMessages();
    setIsOpen((s) => !s);
  }

  function closeRoom() {
    onRoomSelected(null);
    resetMessages();
  }

  if (rooms.length === 0) return null;

  if (!isOpen)
    return (
      <div className="chat-open-button" onClick={toggleIsOpen}>
        <HiMiniChatBubbleOvalLeftEllipsis className="chat-icon" />
        <span>Chat Now</span>
      </div>
    );

  return (
    <div className="chats-container">
      <ChatHeader onCloseChat={toggleIsOpen} onCloseRoom={closeRoom} />
      {isOpen && !selectedRoom && (
        <div className="chats-body">
          {rooms?.map((room) => (
            <ChatRoom room={room} key={room.room_id} onClick={onRoomSelected} />
          ))}
        </div>
      )}
      {isOpen && selectedRoom && <ChatWindow />}
    </div>
  );
}

export default Chat;
