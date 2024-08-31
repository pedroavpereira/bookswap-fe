/* eslint-disable react/prop-types */

import { useSwaps } from "../../contexts/SwapsContext";
import { useUser } from "../../contexts/UserContext";
import calculateDistance from "../../utils/calculateDistance";

function SwapsAcceptedRow({ swap }) {
  const { user } = useUser();
  const { completeSwap } = useSwaps();
  const didIRequest = swap.user_requesting === user.user_id ? true : false;

  const { bookRequested, bookOffered, userRequested, userOffered } = swap;
  let bookOrder = [];

  if (didIRequest) {
    bookOrder = [swap.bookRequested, swap.bookOffered];
  } else {
    bookOrder = [swap.bookOffered, swap.bookRequested];
  }

  function handleComplete() {
    completeSwap(swap.swap_id);
  }

  console.log(bookRequested, bookOffered);

  console.log(swap);
  return (
    <tr>
      <td className="wishtable-image">
        <img src={bookRequested?.image} />
        <img src={bookOffered?.image} />
      </td>
      <td className="wishlist-table-content text-center ">
        <p className="wishlist-table-title fw-bold">{bookRequested.title}</p>
        <p>
          Requested by: {swap.userRequested.first_name}{" "}
          {swap.userRequested.last_name}
        </p>
      </td>
      <td className="wishlist-table-content text-center">
        {calculateDistance({
          lat1: userRequested.lat,
          lng1: userRequested.lng,
          lat2: userOffered.lat,
          lng2: userOffered.lng,
        })}{" "}
        miles away
      </td>
      <td className="wishlist-table-content">
        <div className="swaps-table-actions">
          <button className="action-button">Chat</button>
          <button className="action-button" onClick={handleComplete}>
            Mark as completed
          </button>
        </div>
      </td>
    </tr>
  );
}

export default SwapsAcceptedRow;
