/* eslint-disable react/prop-types */

import { useUser } from "../../contexts/UserContext";

function SwapsAcceptedRow({ swap }) {
  const { user } = useUser();
  const didIRequest = swap.user_requesting === user.user_id ? true : false;
  let bookOrder = [];

  if (didIRequest) {
    bookOrder = [swap.bookRequested, swap.bookOffered];
  } else {
    bookOrder = [swap.bookOffered, swap.bookRequested];
  }

  console.log(bookOrder);

  return (
    <tr>
      <td>{}</td>
    </tr>
  );
}

export default SwapsAcceptedRow;
