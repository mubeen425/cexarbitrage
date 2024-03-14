import React from "react";

const TableHead = ({ name }) => {
  return (
    <th className="p-2 w-56 border-r rounded-r border-white text-left relative ">
      <span className="text-white">{name}</span>
    </th>
  );
};

export default TableHead;
