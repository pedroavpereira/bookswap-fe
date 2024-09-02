import React from "react"; /* eslint-disable react/prop-types */
import { Table } from "react-bootstrap";
import { HiOutlineTrash } from "react-icons/hi2";

function SwapsTable({ onRender }) {
  return (
    <Table>
      <tbody className="wishlist-table-body">{onRender}</tbody>
    </Table>
  );
}

export default SwapsTable;
