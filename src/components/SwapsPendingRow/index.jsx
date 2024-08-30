import { Link } from "react-router-dom";
import calculateDistance from "../../utils/calculateDistance";
import { useSwaps } from "../../contexts/SwapsContext";

/* eslint-disable react/prop-types */
function SwapsPendingRow({ swap = {} }) {
  const { rejectSwap } = useSwaps();

  function handleReject() {
    rejectSwap(swap.swap_id);
  }

  const { bookRequested, userRequested, userOffered } = swap;
  return (
    <tr>
      <td className="wishtable-image">
        <img src={bookRequested?.image} />
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
          <button className="action-button">
            View {swap.userRequested.first_name}'s collection
          </button>
          <button className="action-button" onClick={handleReject}>
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
}

export default SwapsPendingRow;
