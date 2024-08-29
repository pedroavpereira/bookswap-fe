/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, createContext } from "react";

const CollectionsContext = createContext();

const API_URL = "http://54.75.137.47:3000";

function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Fetch collections
  useEffect(
    function () {
      async function fetchCollections() {
        if (collections !== null) return null;

        const token = localStorage.getItem("token");

        if (!token) return null;

        const options = {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        };
        try {
          setIsLoading(true);
          const response = await fetch(`${API_URL}/collections/mine`, options);

          if (response.status !== 200) return null;

          const data = await response.json();

          setCollections(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchCollections();
    },
    [collections]
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
      setIsLoading(true);
      const response = await fetch(`${API_URL}/collections`, options);

      if (response.status !== 201) return null;

      const data = await response.json();

      setCollections((col) => [...col, data]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
      const response = await fetch(`${API_URL}/collections/${id}`, options);

      if (response.status !== 204) return null;

      setCollections((col) => [...col].filter((el) => el.collection_id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  console.log("collections State", collections);

  return (
    <CollectionsContext.Provider
      value={{ collections, isLoading, createCollection, deleteCollection }}
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
