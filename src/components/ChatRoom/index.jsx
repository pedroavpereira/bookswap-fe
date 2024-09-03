/* eslint-disable react/prop-types */
import { FaCircleUser } from "react-icons/fa6";
import { useUser } from "../../contexts/UserContext";
import "./ChatRoom.css";

function ChatRoom({ room, onClick }) {
  const { user } = useUser();
  // console.log(room, room?.last_message, room?.last_message?.read);
  const thereIsMessage = Boolean(room.last_message);

  const messageUnread =
    thereIsMessage &&
    !room?.last_message?.read &&
    room?.last_message.user_sent !== user.user_id;

  return (
    <div className="chat-row" onClick={() => onClick(room.room_id)}>
      <FaCircleUser className="chat-row-user-icon" />
      <div
        className={`${room?.last_message && "message"} ${
          messageUnread ? "message-unread" : ""
        } chat-room-flex`}
      >
        <p className="chat-room-user">
          {room.user.first_name} {room.user.last_name}
        </p>
        <p className="chat-room-message">
          {room.last_message && room.last_message.message}
        </p>
      </div>
      {messageUnread && <span className="unread-icon"></span>}
    </div>
  );
}

export default ChatRoom;
