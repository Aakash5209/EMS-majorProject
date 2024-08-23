"use client";

import UserContext from "@/app/context/userContext";
import { creategETbYrOLEuSERAPIThunk } from "@/lib/store/thunk/getByRoleUserActionCreator";
import { createGetUserDataAPIThunkRedux } from "@/lib/store/thunk/GetUserDataActionCreator";
import React, { useContext, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";

const AddModal: React.FC = ({ onClose,isOpen , setflag }) => {
  const [role, setRole] = useState("");
  const { user, setUser } = useContext(UserContext);
  const roles = ["Employee", "Team Leader", "Manager"];
  const rolesM = ["Employee", "Team Leader"];
  const rolesTL = ["Employee"];
  const roleMapping = {
    Manager: "Admin",
    "Team Leader": "Manager",
    Employee: "Team Leader",
  };
  const [reportingManagers, setReportingmanager] = useState([]);
  const [showReportingManager, setShowReportingManager] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    role: "",
    reporting_manager: "",
    password: "",
    salary: "",
    email: "",
    gender: "",
    contactNo: "",
  });

  const dispatch = useDispatch();
  const getRoleUserState = useSelector(
    (state) => state.getUserByRoleApiReducer
  );
  const {
    data: getRoleUserStateData,
    loading: getRoleUserStateLoading,
    error: getRoleUserStateError,
  } = getRoleUserState;

  useEffect(() => {
    if (role !== "") {
      const fetchApiDataBackend = creategETbYrOLEuSERAPIThunk(
        "GET_ROLE_BY_USER_REQUEST",
        "GET_ROLE_BY_USER_SUCCESS",
        "GET_ROLE_BY_USER_FAILURE"
      );
      dispatch(
        fetchApiDataBackend(
          "get",
          `/user/getbyrole/${roleMapping[role]}`,
          null
        )
      );
    }
  }, [role]);

  useEffect(() => {
    if (getRoleUserStateData?.manager) {
      setReportingmanager(getRoleUserStateData?.manager);
      setFormData((prev) => ({
        ...prev,
        reporting_manager: getRoleUserStateData?.manager[0]?._id,
      }));
    }
  }, [getRoleUserStateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: String(value),
    }));
  };


  const handleAddModel = (e) => {
    e.preventDefault();
    const fetchApiDataBackend = createGetUserDataAPIThunkRedux(
      "ADD_USER_REQUEST",
      "ADD_USER_SUCCESS",
      "ADD_USER_FAILURE"
    );
    dispatch(fetchApiDataBackend("post", "/user/addUser", formData));
    setflag((prev: boolean) => !prev);
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      dob: "",
      role: "",
      reporting_manager: "",
      password: "",
      salary: "",
      email: "",
      gender: "",
      contactNo: "",
    });
    setRole("");
    onClose();
  };

  if (!isOpen) return null;

  return ReactDom.createPortal(
   
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
    
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
  <button
    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
    onClick={() => {
      onClose();
      setRole("");
      setShowReportingManager(false);
    }}
  >
    &times;
  </button>
  <h2 className="text-xl font-bold text-gray-900 mb-4">Employee Form</h2>
  <form className="space-y-4" onSubmit={handleAddModel}>
    <div className="grid grid-cols-2 gap-3">
    <div>
        <label
          htmlFor="employee-id"
          className="block text-sm font-medium text-gray-700"
        >
          Employee ID
        </label>
        <input
          id="employee-id"
          type="text"
          required
          name="id"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          id="first-name"
          type="text"
          required
          name="firstName"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="last-name"
          type="text"
          name="lastName"
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      

      <div>
        <label
          htmlFor="dob"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          required
          name="dob"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700">Gender</span>
        <div className="mt-1 flex space-x-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              className="form-radio h-4 w-4 text-teal-600"
            />
            <span className="ml-2 text-sm">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              className="form-radio h-4 w-4 text-teal-600"
            />
            <span className="ml-2 text-sm">Female</span>
          </label>
        </div>
      </div>

      <div>
  <style jsx>{`
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  `}</style>
  
  <label
    htmlFor="salary"
    className="block text-sm font-medium text-gray-700"
  >
    Salary
  </label>
  <input
    id="salary"
    type="number"
    required
    name="salary"
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
  />
</div>

     
    </div>

    <div className="grid grid-cols-2 gap-3">
    <div>
        <label
          htmlFor="contactNo"
          className="block text-sm font-medium text-gray-700"
        >
          Contact No
        </label>
        <input
          id="contactNo"
          type="text"
          required
          name="contactNo"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

     
    </div>

    <div>
      <label
        htmlFor="role"
        className="block text-sm font-medium text-gray-700"
      >
        Role
      </label>
      <select
        id="role"
        required
        name="role"
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          if (e.target.value !== "") {
            setShowReportingManager(true);
          } else {
            setShowReportingManager(false);
            setRole("");
          }
          handleChange(e);
        }}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">Select a role</option>
        {user[0]?.role === "Admin" &&
          roles?.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        {user[0]?.role === "Manager" &&
          rolesM?.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        {user[0]?.role === "Team Leader" &&
          rolesTL?.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
      </select>
    </div>

    {showReportingManager && (
      <div>
        <label
          htmlFor="reporting-manager"
          className="block text-sm font-medium text-gray-700"
        >
          Reporting Manager
        </label>
        <select
          id="reporting-manager"
          name="reporting_manager"
          required
          disabled={role === "Manager"}
          value={formData.reporting_manager}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
        >
          {reportingManagers?.map((manager) => (
            <option key={manager?.id} value={manager._id}>
              {manager?.firstName} {manager?.lastName}{" "}
            </option>
          ))}
        </select>
      </div>
    )}

    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        name="password"
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm px-2 py-1 focus:ring-teal-500 focus:border-teal-500"
      />
    </div>

    <input
      type="submit"
      value="Submit"
      className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 text-sm"
    />
  </form>
</div>

  </div>,
  
    document.getElementById("popupmodal")
  );
};

export default AddModal;
