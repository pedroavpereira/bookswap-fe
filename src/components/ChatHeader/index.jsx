/* eslint-disable react/prop-types */
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import { useChats } from "../../contexts/ChatsContext";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

function ChatHeader({ onCloseRoom, onCloseChat }) {
  const { selectedRoom } = useChats();

  if (!selectedRoom)
    return (
      <div className="chats-header" onClick={onCloseChat}>
        <HiMiniChatBubbleOvalLeftEllipsis className="chat-icon" />{" "}
        <span>Chat Rooms</span>
      </div>
    );

  if (selectedRoom)
    return (
      <div className="chats-header chat-window-header">
        <FaArrowLeft onClick={onCloseRoom} />
        <span>
          {selectedRoom.user.first_name} {selectedRoom.user.last_name}
        </span>
        <FaXmark onClick={onCloseChat} />
      </div>
    );
}

export default ChatHeader;
