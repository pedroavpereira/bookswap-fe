/* eslint-disable react/prop-types */
import { useUser } from "./UserContext";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import io from "socket.io-client";
import { API_URL } from "../utils/constants";
import toast from "react-hot-toast";
import MessageToast from "../components/MessageToast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
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
    if (!user) return;
    const newSocket = io(API_URL, { query: { userId: user?.user_id } });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [user]);

  const markAsRead = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (
      messageList.length === 0 ||
      messageList.find(
        (msg) => msg.user_sent !== user.user_id && msg.read === false
      ) === undefined ||
      !selectedRoom
    )
      return;

    if (!token) return null;

    const options = {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch(
        `${API_URL}/rooms/markAsRead/${selectedRoom.room_id}`,
        options
      );

      if (response.status !== 200) return null;

      const data = await response.json();

      setMessageList((msgs) =>
        [...msgs].map((msg) =>
          msg.user_sent === user.user_id ? msg : { ...msg, read: true }
        )
      );

      setRooms((rooms) =>
        [...rooms].map((room) => (room.room_id === data.room_id ? data : room))
      );
    } catch (err) {
      console.log(err);
    }
  }, [user?.user_id, messageList, selectedRoom]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    const handleReceiveMessages = (messages) => {
      setMessageList(messages);
      setChatIsLoading(false);
      markAsRead();
    };

    const handlePing = (data) => {
      const { user, message, message_id, read, room_id, sent_at, user_sent } =
        data;

      setRooms((rooms) =>
        rooms.map((room) =>
          room.room_id === room_id
            ? {
                ...room,
                last_message: { message, message_id, read, sent_at, user_sent },
              }
            : room
        )
      );

      toast((t) => (
        <MessageToast name={`${user.first_name} ${user.last_name}`} t={t} />
      ));
    };

    socket.on("receive_message", handleReceiveMessage);

    socket.on("receive_messages", handleReceiveMessages);

    socket.on("pinged", handlePing);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("receive_messages", handleReceiveMessages);
      socket.off("pinged", handlePing);
    };
  }, [socket, markAsRead]);

  const joinRoom = (room_id) => {
    socket.emit("join_room", { room: room_id, user: user.user_id });
    setChatIsLoading(true);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", { room: selectedRoom });
  };

  const sendMessage = async (currentMessage) => {
    if (currentMessage !== "") {
      const messageData = {
        room_id: selectedRoom.room_id,
        user_sent: user.user_id,
        message: currentMessage,
        user_receiver:
          selectedRoom.user_1 === user.user_id
            ? selectedRoom.user_2
            : selectedRoom.user_1,
      };

      await socket.emit("send_message", messageData);
      setMessageList((msg) => [...msg, messageData]);
    }
  };

  function onRoomSelected(room_id) {
    setSelectedRoom(rooms.find((room) => room.room_id === room_id));

    if (!room_id) return;
    joinRoom(room_id);
  }

  function resetMessages() {
    setMessageList([]);
  }

  return (
    <ChatContext.Provider
      value={{
        socket,
        rooms,
        selectedRoom,
        onRoomSelected,
        joinRoom,
        leaveRoom,
        messageList,
        resetMessages,
        sendMessage,
        chatIsLoading,
        markAsRead,
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
