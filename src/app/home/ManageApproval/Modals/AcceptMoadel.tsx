"use client";

import { createAcceptSalaryApprovalAPIThunk } from "@/lib/store/thunk/acceptSalaryApprovalActionCreator";
import React, { useState } from "react";

import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";

const AcceptModal: React.FC = ({
  setCurrentBox,
  isOpen,
  currentBox,
  setSalaryAccepted,
  onClose,
}) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();

  const handleAcceptModel = (e) => {
    e.preventDefault();

    const fetchApiDataBackend = createAcceptSalaryApprovalAPIThunk(
      "acceptsalaryreq",
      "acceptsalarysuc",
      "acceptsalaryfail"
    );
    dispatch(
      fetchApiDataBackend("post", `/salary/approveSalary`, {
        currentSalary: currentBox?.currentSalary,
        updatedSalary: currentBox?.updatedSalary,
        id: currentBox?.id,
      })
    );
    setSalaryAccepted((prev) => !prev);
    onClose();
  };


  return ReactDom.createPortal(
   
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center">
  <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-xs relative">
    <button
      className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
      onClick={() => {
        setCurrentBox({});
        onClose();
      }}
    >
      &times;
    </button>
    <h2 className="text-xl font-semibold mb-4 text-gray-900">
      Confirm Salary Update
    </h2>
    <form className="flex justify-center" onSubmit={handleAcceptModel}>
      <input
        type="submit"
        value="Accept"
        className="px-4 py-2 bg-teal-500 text-white font-medium rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 text-base"
      />
    </form>
  </div>
</div>,
    document.getElementById("popupmodal")
  );
};

export default AcceptModal;
