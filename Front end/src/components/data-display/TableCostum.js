import React from "react";

const TableCostum = ({ header, data }) => {
  return (
    <table className="min-w-full text-left text-sm font-light table-auto ">
      <thead className="border-b  font-medium opacity-70">
        <tr>
          {header?.map((item, index) => (
            <th key={index} scope="col" className=" p-3 ">
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </table>
  );
};

export default TableCostum;
