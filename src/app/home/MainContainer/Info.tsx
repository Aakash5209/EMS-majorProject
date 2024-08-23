import React, { useContext, useEffect } from "react";
import { HomePageProps } from "../page";
import UserContext from "@/app/context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Info = () => {
  const { user, setUser } = useContext(UserContext);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (

    <main className="flex-1 p-8 bg-gray-50 font-sans">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">
      User Details
    </h1>
    <div className="grid grid-cols-2 gap-6">
    <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">Id:</strong>
          {user?.length > 0 ? user[0].id : "N/A"}
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">Name:</strong>
          {user?.length > 0
            ? `${user[0].firstName} ${user[0].lastName}`
            : "N/A"}
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">Email Address:</strong>
          {user?.length > 0 ? user[0].email : "N/A"}
        </p>
      </div>
      {/* <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">Repoting manager Id:</strong>
          {user?.length > 0 ? user[0].reporting_manager : "N/A"}
        </p>
      </div> */}
      {user?.length > 0 && user[0].role !== "Admin" && (
  <div className="col-span-1">
    <p className="text-lg text-gray-700">
      <strong className="block text-gray-600">Reporting manager Id:</strong>
      {user[0].reporting_manager || "N/A"}
    </p>
  </div>
)}

      <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">Role:</strong>
          {user?.length > 0 ? user[0].role : "N/A"}
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">DOB:</strong>
          {user?.length > 0 ? formatDate(user[0].dob) : "N/A"}
        </p>
      </div>
     
      <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">Contact No.:</strong>
          {user?.length > 0 ? user[0].contactNo : "N/A"}
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-lg text-gray-700">
          <strong className="block text-gray-600">Gender:</strong>
          {user?.length > 0 ? user[0].gender : "N/A"}
        </p>
      </div>
    </div>
  </div>
</main>

  );
};

export default Info;
