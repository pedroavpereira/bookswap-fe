/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SwapContext = createContext();

// const API_URL = "http://54.75.137.47:3000";

function SwapsProvider({ children }) {
  const navigate = useNavigate();
  const [swaps, setSwaps] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Fetch swaps
  useEffect(
    function () {
      async function fetchCollections() {
        if (swaps !== null) return null;

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
          const response = await fetch(`${API_URL}/swaps/`, options);

          if (response.status !== 200) return null;

          const data = await response.json();

          setSwaps(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchCollections();
    },
    [swaps]
  );
  //Create swap

  async function createSwap(data) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const reqBody = { collection_id: parseInt(data) };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(reqBody),
    };

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/swaps/`, options);

      if (response.status !== 201) return null;

      const data = await response.json();

      setSwaps((swaps) => [...swaps, data]);
      navigate("/swaps");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  //Accept Swap
  async function acceptSwap({ swap_id, collection_id }) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ collection_chosen: collection_id }),
    };

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/swaps/accept/${swap_id}`,
        options
      );

      if (response.status !== 200) return null;

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  //Reject Swap

  async function rejectSwap(id) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/swaps/reject/${id}`, options);

      if (response.status !== 200) return null;

      const data = await response.json();

      console.log("fetch", data);

      setSwaps((swaps) => swaps.map((sw) => (sw.swap_id === id ? data : sw)));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function completeSwap(id) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/swaps/complete/${id}`, options);

      if (response.status !== 200) return null;

      const data = await response.json();

      setSwaps((swaps) => swaps.map((sw) => (sw.swap_id === id ? data : sw)));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SwapContext.Provider
      value={{
        swaps,
        isLoading,
        createSwap,
        acceptSwap,
        rejectSwap,
        completeSwap,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}

export function useSwaps() {
  const context = useContext(SwapContext);
  if (context === undefined)
    throw new Error(
      "Collections context was used outside of the CollectionsProvider"
    );
  return context;
}

export default SwapsProvider;
