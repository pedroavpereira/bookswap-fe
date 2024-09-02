import React from "react"; /* eslint-disable react/prop-types */
function SwapsCompletedRow({ swap }) {
  const { bookRequested } = swap;
  return (
    <tr
      className={
        swap.status === "accepted"
          ? "swap-complete-accepted"
          : "swap-complete-rejected"
      }
    >
      <td className="wishtable-image">
        <img src={bookRequested?.image} />
      </td>
      <td className="wishlist-table-content text-center ">
        <p className="wishlist-table-title fw-bold">{bookRequested?.title}</p>
        <p>
          Requested by: {swap.userRequested.first_name}{" "}
          {swap.userRequested.last_name}
        </p>
      </td>
      <td className="wishlist-table-content wishlist-table-status">
        {swap.status}
      </td>
    </tr>
  );
}

export default SwapsCompletedRow;
