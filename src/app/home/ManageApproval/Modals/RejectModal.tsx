"use client";

import { createRejectSalaryAPIThunkRedux } from "@/lib/store/thunk/rejectSalaryActionCreator";
import React, { useState } from "react";

import ReactDom from "react-dom";
import { useDispatch } from "react-redux";

const RejectModal: React.FC = ({
  setSalaryAccepted,
  isOpen,
  currentBox,
  onClose,
  setCurrentBox,
}) => {
  if (!isOpen) return null;
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();


  const handleAddModel = (e) => {
    e.preventDefault();

    const fetchApiDataBackend = createRejectSalaryAPIThunkRedux(
      "rejectreq",
      "rejectsuc",
      "rejectfail"
    );
    dispatch(
      fetchApiDataBackend("delete", `/salary/rejectSalary`, {
        currentSalary: currentBox?.currentSalary,
        updatedSalary: currentBox?.updatedSalary,
        id: currentBox?.id,
      })
    );
    setSalaryAccepted((prev) => !prev);
    onClose();
  };


  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl"
          onClick={() => onClose()}
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Rejection Reason Form
        </h2>
        <form className="space-y-6" onSubmit={handleAddModel}>
          <div>
            <label
              htmlFor="rejection-reason"
              className="block text-lg font-medium text-gray-800"
            >
              Rejection Reason
            </label>
            <input
              id="rejection-reason"
              type="text"
              required
              onChange={(e) => setReason(e.target.value)}
              name="reason"
              className="mt-2 outline-none block w-full border-gray-400 rounded-md shadow-sm text-lg p-3"
            />
          </div>

          <input
            type="submit"
            value={"Reject"}
            className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-80 text-lg"
          />
        </form>
      </div>
    </div>,
    document.getElementById("popupmodal")
  );
};

export default RejectModal;
