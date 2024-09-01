/* eslint-disable react/prop-types */
import "./ChatRoom.css";

function ChatRoom({ room, onClick }) {
  return (
    <div
      className={`chat-room-flex ${room.last_message && "message"}${
        room?.last_message.read ? "message-read" : "message-unread"
      }`}
      onClick={() => onClick(room.room_id)}
    >
      <p className="chat-room-user">
        {room.user.first_name} {room.user.last_name}
      </p>
      <p className="chat-room-message">
        {room.last_message && room.last_message.message}
      </p>
    </div>
  );
}

export default ChatRoom;
