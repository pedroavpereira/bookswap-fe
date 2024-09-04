/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";
import { API_URL } from "../utils/constants";
import { useUser } from "./UserContext";

const CollectionsContext = createContext();

// const API_URL = "http://54.75.137.47:3000";

function CollectionsProvider({ children }) {
  const { user, isLoading: userLoading } = useUser();
  const [collections, setCollections] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  useEffect(
    function () {
      if (!user) {
        setCollections([]);
        setIsFetching(true);
      }
    },
    [user]
  );

  //Fetch collections
  useEffect(
    function () {
      async function fetchCollections() {
        console.log("test");
        if (!user || userLoading || !isFetching) return null;

        const token = localStorage.getItem("token");

        if (!token) return null;

        const options = {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        };
        try {
          const response = await fetch(`${API_URL}/collections/mine`, options);

          if (response.status !== 200) return null;

          const data = await response.json();
          console.log("refetch");

          setCollections(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsFetching(false);
        }
      }

      fetchCollections();
    },
    [isFetching, user, userLoading]
  );

  //Create new Collection
  async function createCollection(data) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };

    try {
      setIsMutating(true);
      const response = await fetch(`${API_URL}/collections`, options);

      if (response.status !== 201) return null;

      const data = await response.json();

      console.log(data);

      setCollections((col) => [...col, data]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsMutating(false);
    }
  }

  //Delete collection
  async function deleteCollection(id) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      setIsMutating(true);
      const response = await fetch(`${API_URL}/collections/${id}`, options);

      if (response.status !== 204) return null;

      setCollections((col) => [...col].filter((el) => el.collection_id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsMutating(false);
    }
  }

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        isLoading: isFetching || isMutating,
        createCollection,
        deleteCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionsContext);
  if (context === undefined)
    throw new Error(
      "Collections context was used outside of the CollectionsProvider"
    );
  return context;
}

export default CollectionsProvider;
