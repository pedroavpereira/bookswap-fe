import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FullPageSpinner from "../../components/FullPageSpinner";

const API_URL = "127.0.0.1:3001";

function Chat() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchRooms() {
        try {
          if (!localStorage.getItem("token")) {
            navigate("/");
          }

          setIsLoading(true);

          const options = {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          };
          const response = await fetch(`${API_URL}/rooms/`, options);

          if (!response.ok) throw "error";

          const data = await response.json();

          setRooms(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchRooms();
    },
    [setRooms, navigate]
  );

  console.log(rooms);

  if (isLoading) return <FullPageSpinner />;

  return <div>Chat</div>;
}

export default Chat;
