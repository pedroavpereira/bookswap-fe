/* eslint-disable react/prop-types */
import { Table } from "react-bootstrap";
import { HiOutlineTrash } from "react-icons/hi2";

function WishlistTable({ wishs, onDelete }) {
  return (
    <Table>
      <thead>
        <tr className="text">
          <th className="text-center">Image</th>

          <th>Name</th>

          <th className="text-center">Radius</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="wishlist-table-body">
        {wishs.map((wish) => (
          <tr key={wish.wishlist_id}>
            <td className="wishtable-image">
              <img src={wish?.book?.image} />
            </td>
            <td className="wishlist-table-content wishlist-table-title">
              {wish?.book.title}
            </td>
            <td className="wishlist-table-content wishlist-table-radius">
              {wish?.radius} miles
            </td>
            <td
              className="wishlist-table-content wishlist-table-action text-center"
              onClick={() => onDelete(wish.wishlist_id)}
            >
              <HiOutlineTrash className="text-danger" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default WishlistTable;
