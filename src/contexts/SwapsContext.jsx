/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const SwapContext = createContext();

const API_URL = "http://54.75.137.47:3000";

function SwapsProvider({ children }) {
  const [swaps, setSwaps] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Fetch swaps

  //Create swap

  async function createSwap(data) {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/swaps/`, options);

      if (response.status !== 201) return null;

      const data = await response.json();

      setSwaps((swaps) => [...swaps, data]);
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

      setSwaps((swaps) =>
        swaps.map((sw) => (sw.swap_id === swap_id ? data : sw))
      );
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

export default SwapsProvider;
