import React, { useMemo } from "react";
import { useTable } from "react-table";


const showTable = ({ DATA, handleSalaryChange }) => {
  const COLUMNS = [
    {
      Header: "Id",
      accessor: "id",
      disableFilters: true,
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Salary",
      accessor: "salary",
    },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: ({ cell }: any) => (
        <button
          onClick={() => handleSalaryChange(cell)}
          className="px-4 py-2 bg-blue-500 text-white  shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Edit
        </button>
      ),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, [DATA]);


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
   
    <div className="flex justify-center p-6 bg-gray-50">
  <div className="overflow-x-auto shadow-md sm:rounded-lg max-w-6xl w-full">
    <table
      {...getTableProps()}
      className="min-w-full bg-gray-50 text-gray-800"
    >
      <thead className="bg-gray-200">
        {headerGroups.map((headerGroup, headerGroupIndex) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={`header-group-${headerGroupIndex}`}
          >
            {headerGroup.headers.map((column) => (
              <th
                className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b border-gray-300"
                {...column.getHeaderProps()}
                key={column.id}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={`row-${rowIndex}`}
              className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
            >
              {row.cells.map((cell, cellIndex) => (
                <td
                  {...cell.getCellProps()}
                  className="py-3 px-6 text-sm border-b border-gray-300"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

   
  

  );
};

export default showTable;
