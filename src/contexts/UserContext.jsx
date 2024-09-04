/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      async function fetchUserData() {
        try {
          setIsLoading(true);

          const options = {
            method: "GET",
            headers: {
              Authorization: token,
            },
          };

          const response = await fetch(`${AUTH_URL}/validate-token`, options);

          if (response.status !== 200) return;

          const data = await response.json();

          setUser(data.user);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      if (user !== null) return;

      fetchUserData();
    },
    [user]
  );

  async function login(data) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);

      const response = await fetch(`${AUTH_URL}/login`, options);

      if (response.status !== 200) return;

      const data = await response.json();

      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(data) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);

      const response = await fetch(`${AUTH_URL}/signup`, options);

      if (response.status !== 200) return;

      const data = await response.json();

      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error(
      "Collections context was used outside of the CollectionsProvider"
    );
  return context;
}

export default UserProvider;
