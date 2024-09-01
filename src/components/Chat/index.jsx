import { useState } from "react";
import { useChats } from "../../contexts/ChatsContext";
import ChatRoom from "../ChatRoom";
import ChatHeader from "../ChatHeader";
import ChatWindow from "../ChatWindow";

function Chat() {
  const { rooms, onRoomSelected, selectedRoom, resetMessages, markAsRead } =
    useChats();
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

  console.log(selectedRoom);

  if (rooms.length === 0) return null;
  return (
    <div className="chats-container">
      <ChatHeader onCloseChat={toggleIsOpen} onCloseRoom={closeRoom} />
      {isOpen && !selectedRoom && (
        <div className="chats-body">
          {rooms?.map((room) => (
            <ChatRoom room={room} key={room.id} onClick={onRoomSelected} />
          ))}
        </div>
      )}
      {isOpen && selectedRoom && <ChatWindow />}
    </div>
  );
}

export default Chat;
