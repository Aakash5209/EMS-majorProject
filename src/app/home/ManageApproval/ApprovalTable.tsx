import React, { useMemo } from "react";
import { useTable } from "react-table";

const ApprovalTable = ({ data, onAccept, onReject, setCurrentBox }) => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "User",
        accessor: (row) => `${row.firstName} ${row.lastName}`, // Combine first and last name
        id: "fullName", // Give an id to this column
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Current Salary",
        accessor: "currentSalary",
      },
      {
        Header: "Updated Salary",
        accessor: "updatedSalary",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setCurrentBox(row.original);
                onAccept();
              }}
              className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
            >
              Accept
            </button>
            <button
              onClick={() => {
                setCurrentBox(row.original);
                onReject();
              }}
              className="bg-red-400 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
            >
              Reject
            </button>
          </div>
        ),
      },
    ],
    [onAccept, onReject, setCurrentBox]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg max-w-6xl w-full mx-auto">
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="bg-white border-b">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-3 px-6 text-sm">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalTable;
