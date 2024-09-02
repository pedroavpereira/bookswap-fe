/* eslint-disable react/prop-types */
import { useUser } from "../../contexts/UserContext";
import "./ChatRoom.css";

function ChatRoom({ room, onClick }) {
  const { user } = useUser();
  // console.log(room, room?.last_message, room?.last_message?.read);
  const thereIsMessage = Boolean(room.last_message);

  return (
    <div
      className={`chat-room-flex ${room?.last_message && "message"}${
        room?.last_message?.read ? "message-read" : "message-unread"
      }`}
      onClick={() => onClick(room.room_id)}
    >
      <p className="chat-room-user">
        {room.user.first_name} {room.user.last_name}
      </p>
      <p className="chat-room-message">
        {room.last_message && room.last_message.message}
      </p>
      {thereIsMessage &&
        !room?.last_message?.read &&
        room?.last_message.user_sent !== user.user_id && (
          <span className="message-unread"></span>
        )}
    </div>
  );
}

export default ChatRoom;
