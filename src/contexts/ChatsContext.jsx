/* eslint-disable react/prop-types */
import { useUser } from "./UserContext";
import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "../utils/constants";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [chatIsLoading, setChatIsLoading] = useState(false);

  useEffect(function () {
    async function fetchRooms() {
      const token = localStorage.getItem("token");

      if (!token) return null;

      const options = {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const response = await fetch(`${API_URL}/rooms/`, options);

        if (response.status !== 200) return null;

        const data = await response.json();

        setRooms(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRooms();
  }, []);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("receive_messages", (messages) => {
      setMessageList(messages);
      setChatIsLoading(false);
    });
  }, [socket]);

  const joinRoom = (room_id) => {
    socket.emit("join_room", { room: room_id, user: user.user_id });
    setChatIsLoading(true);
    setShowChat(true);
  };

  const sendMessage = async (currentMessage) => {
    if (currentMessage !== "") {
      console.log(selectedRoom.room_id);
      const messageData = {
        room_id: selectedRoom.room_id,
        user_sent: user.user_id,
        message: currentMessage,
      };

      console.log(messageData);
      await socket.emit("send_message", messageData);
      setMessageList((msg) => [...msg, messageData]);
      // We don't need to update messageList here as it will be updated by the Supabase real-time subscription
    }
  };

  function onRoomSelected(room_id) {
    setSelectedRoom(rooms.find((room) => room.room_id === room_id));
    joinRoom(room_id);
  }

  function resetMessages() {
    setMessageList([]);
  }

  return (
    <ChatContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        showChat,
        setShowChat,
        selectedRoom,
        onRoomSelected,
        joinRoom,
        messageList,
        resetMessages,
        sendMessage,
        chatIsLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export function useChats() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error(
      "Collections context was used outside of the CollectionsProvider"
    );
  return context;
}
