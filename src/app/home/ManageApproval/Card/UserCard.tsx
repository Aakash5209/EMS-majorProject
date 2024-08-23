import React from "react";

const UserCard = ({
  setCurrentBox,
  role,
  onReject,
  id,
  updatedSalary,
  username,
  onAccept,
  currentSalary,
}) => {
  return (
    
    <div className="max-w-2xl w-full bg-gray-50 shadow-xl rounded-lg overflow-hidden border border-gray-200 m-6 p-6">
    <div className="mb-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Update Salary Request
      </h1>
      <ul className="space-y-4 text-gray-700 text-base">
        <li>
          <strong>User:</strong> {username}
        </li>
        <li>
          <strong>Role:</strong> {role}
        </li>
        <li>
          <strong>Current Salary:</strong> {currentSalary}
        </li>
        <li>
          <strong>Updated Salary:</strong> {updatedSalary}
        </li>
      </ul>
    </div>
    <div className="flex justify-end space-x-4">
      <button
        onClick={() => {
          setCurrentBox({ currentSalary, updatedSalary, id });
          onAccept();
        }}
        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 text-base"
      >
        Accept
      </button>
      <button
        onClick={() => {
          setCurrentBox({ currentSalary, updatedSalary, id });
          onReject();
        }}
        className="bg-red-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 text-base"
      >
        Reject
      </button>
    </div>
  </div>

  

  );
};

export default UserCard;
