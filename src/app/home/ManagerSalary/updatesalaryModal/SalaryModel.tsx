"use client";

import { createUpdateSalaryAPIThunkRedux } from "@/lib/store/thunk/UpdateSalaryActionCreator";
import React, { useEffect, useState } from "react";

import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";

const SalaryModel: React.FC = ({
  userData,
  onClose,
  handleSalaryUpdate,
  isOpen,
}) => {
  if (!isOpen) return null;
  const [formData, setFormData] = useState({
    id: "",
    updatedSalary: "",
    currentSalary: userData?.salary,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, id: userData?.id };
    });
  }, [userData]);

  const handleChangeInForm = (e) => {
    const { name, value } = e.target;
    console.log(name, value, e.target);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddModel = (e) => {
    e.preventDefault();

    const fetchApiDataBackend = createUpdateSalaryAPIThunkRedux(
      "updatesalaryrequest",
      "updatesalarysuccess",
      "updatesalaryfail"
    );
    dispatch(
      fetchApiDataBackend("post", `/salary/updateSalary`, formData)
    );
    handleSalaryUpdate();
    onClose();
  };

  return ReactDom.createPortal(
    
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
  <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md relative">
    <button
      className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
      onClick={() => onClose()}
    >
      &times;
    </button>
    <h2 className="text-2xl font-bold mb-5 text-gray-900">Update Salary</h2>
    <form className="space-y-4" onSubmit={handleAddModel}>
      <div>
        <label
          htmlFor="employee-id"
          className="block text-lg font-medium text-gray-700"
        >
          Employee ID
        </label>
        <input
          id="employee-id"
          type="text"
          disabled
          name="id"
          defaultValue={userData?.id}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-lg p-2 bg-gray-200"
        />
      </div>

      <div>
        <label
          htmlFor="full-name"
          className="block text-lg font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          disabled
          name="fullname"
          defaultValue={`${userData?.firstName} ${userData?.lastName}`}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-lg p-2 bg-gray-200"
        />
      </div>

      <div>
        <label
          htmlFor="current-salary"
          className="block text-lg font-medium text-gray-700"
        >
          Current Salary
        </label>
        <input
          id="current-salary"
          type="text"
          disabled
          defaultValue={userData?.salary}
          name="currentSalary"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-lg p-2 bg-gray-200"
        />
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
    htmlFor="updated-salary"
    className="block text-lg font-medium text-gray-700"
  >
    Updated Salary
  </label>
  <input
    id="updated-salary"
    type="number"
    required
    name="updatedSalary"
    onChange={handleChangeInForm}
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-lg p-2"
  />
</div>


      <input
        type="submit"
        value="Submit"
        className="w-full px-4 py-2 bg-blue-400 text-white font-bold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-lg"
      />
    </form>
  </div>
</div>,
    document.getElementById("popupmodal")
  );
};

export default SalaryModel;
