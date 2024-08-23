import React, { useMemo } from "react";
import {
  useTable,
} from "react-table";
import { format } from "date-fns";
import { debounce } from "lodash";


const ShowTable = ({
  DATA,
  setColumnFilter,
  columnFilter,
}: {
  DATA;
}) => {
  const COLUMNS = [
    {
      Header: "Employee Id",
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
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "contact No",
      accessor: "contactNo",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "D.O.B",
      accessor: "dob",
      Cell: ({ value }: { value: string }) => {
       
        const formattedDate = format(new Date(value), "yyyy-MM-dd");
        return <span>{formattedDate}</span>;
      },
    },
  ];

  const setColumnFilterDb = debounce(setColumnFilter, 400);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, [DATA]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
    );

  const handleChanginClm = (e, name) => {
    setColumnFilterDb((prev) => ({
      ...prev,
      [name]: String(e.target.value),
    }));
  };

  return (
    <>
      
      <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-md">
  <table
    {...getTableProps()}
    className="min-w-full bg-white border-collapse rounded-lg"
  >
    <thead>
      {headerGroups.map((headerGroup, headerGroupIndex) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          key={`header-group-${headerGroupIndex}`}
          className="bg-gray-200 text-black"
        >
          {headerGroup.headers.map((column) => (
            <th
              className="py-2 px-4 border-b border-black-200 text-left text-sm font-medium"
              {...column.getHeaderProps()}
              key={column.id}
            >
              {/* Conditionally render the filter input based on the column accessor */}
              {["firstName", "lastName", "email", "role"].includes(column.id) ? (
                <div className="flex flex-col">
                  <input
                    type="text"
                    name={`${column?.id}`}
                    onChange={(e) => handleChanginClm(e, column?.id)}
                    placeholder={`Search ${column.render("Header")}`}
                    className="w-full px-2 py-1 text-xs text-gray-900 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 mb-1"
                  />
                  <span className="mt-1">{column.render("Header")}</span>
                </div>
              ) : (
                <span className="block mt-8">{column.render("Header")}</span>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()} className="text-gray-900">
      {rows.map((row, rowIndex) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            key={`row-${rowIndex}`}
            className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
          >
            {row.cells.map((cell, cellIndex) => (
              <td
                {...cell.getCellProps()}
                className="py-3 px-6 border-b border-gray-200 text-sm"
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
    </>
  );
};

export default ShowTable;
