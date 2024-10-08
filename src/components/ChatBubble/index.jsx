/* eslint-disable react/prop-types */
import "./ChatBubble.css";

function ChatBubble({ message, isSelf }) {
  return (
    <div className={`chat-msg ${isSelf ? "self" : "user"}`}>
      <div className="cm-msg-text">{message}</div>
    </div>
  );
}

export default ChatBubble;
