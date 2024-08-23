

import React, { useContext, useEffect, useState } from "react";
import SalaryModel from "./updatesalaryModal/SalaryModel";
import ShowTable from "./showTable";
import { useDispatch, useSelector } from "react-redux";
import { createGetUserDataAPIThunkRedux } from "@/lib/store/thunk/GetUserDataActionCreator";
import UserContext from "@/app/context/userContext";


const ManageSalary = () => {
  const [datas, Setdatas] = useState([])
  const [PageNo, setPageNo] = useState(1)
  const [salaryUpdated, setSalaryUpdated] = useState(false)
  
  const [editCell, setEditCell] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const UserDataStateRedux = useSelector((state) => state.getUserDataApiReducerRedux);
  const {
    data: UserData,
    loading: UserDataLoading,
    error: UserDataError,
  } = UserDataStateRedux;

  const dispatch = useDispatch()

  const { user, setUser } = useContext(UserContext);

  const handleSalaryChangeFn = (cell) => {
    setIsModalOpen(true);
    setEditCell(cell.row.original);
  };

  useEffect(() => {
    if (UserData?.User) {
      Setdatas(UserData?.User);
    }

    if (UserDataError) {
      alert(UserDataError);
    }
  }, [UserData]);

  const handleSalaryUpdate = () =>{
    setSalaryUpdated(prev=>!prev)
  }

  const list = Array.from(
    { length: UserData?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  useEffect(()=>{
    const fetchApiDataBackend = createGetUserDataAPIThunkRedux(
      'updatedRequest',
      'updatedSuccess',
      'updatedFail'
    );
    setTimeout(() => {
      dispatch(fetchApiDataBackend("get", `/salary/getAllUserSalaryByRole/${PageNo}/5`, null));
    }, 300);
  }, [PageNo, salaryUpdated])

  


  return (
    
    <div className="p-6 bg-gray-50 rounded-lg shadow-md w-full">
  <h1 className="text-3xl font-bold mb-6 text-gray-800">Salary Info</h1>

  <SalaryModel
    userData={editCell}
    handleSalaryUpdate={handleSalaryUpdate}
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
  />

  <div className="flex justify-center ">
    <div className="w-full max-w-4xl">
      <ShowTable DATA={datas} handleSalaryChange={handleSalaryChangeFn} />
    </div>
  </div>

  {list && (
    <div className="flex justify-center mt-6">
      {list.map((i) => (
        <span
          key={i}
          onClick={() => setPageNo(i)}
          className={`cursor-pointer mx-2 px-3 py-1 text-lg font-medium rounded-full ${
            UserData?.extraInfo?.pageNo == i
              ? "text-green-600"
              : "text-green-500 hover:bg-green-100 hover:border-green-500 border-2 border-transparent"
          } ${
            UserData?.extraInfo?.pageNo != i ? "hover:border-green-500" : ""
          }`}
        >
          {i}
        </span>
      ))}
    </div>
  )}
</div>

  );
};

export default ManageSalary;

  