import React, {useEffect, useState} from 'react'
import UserCard from './Card/UserCard'
import RejectModal from './Modals/RejectModal';
import AcceptModal from './Modals/AcceptMoadel';
import { useDispatch, useSelector } from 'react-redux';
import { createNotiApprovalAPIThunk } from '@/lib/store/thunk/approvalNotificationActionCreator';
import ApprovalTable from "./ApprovalTable";

const ManageApproval = () => {
  const [UserData, setUserData] = useState([])
  
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [salaryAccepted, setSalaryAccepted] = useState(false);
  const dispatch = useDispatch()
  const onAccept = () => {
    setIsAcceptModalOpen(true)
  }

  const onReject = () =>{
    setIsRejectModalOpen(true)
  }

  const NotificationApprovalsStateRedux = useSelector((state) => state.approvalNotificationApiReducerReudux);
  const {
    data: NotificationApprovalData,
    loading: NotificationApprovalLoading,
    error: NotificationApprovalError,
  } = NotificationApprovalsStateRedux;

  const [currentBox, setCurrentBox] = useState({})


  useEffect(()=>{
    if(NotificationApprovalData) {
      setUserData(NotificationApprovalData?.data)
    }
  }, [NotificationApprovalData])

  useEffect(() => {
    const fetchApiDataBackend = createNotiApprovalAPIThunk(
      'aproveNotireq',
      'aproveNotisucc',
      'aproveNotifail'
    );
    dispatch(fetchApiDataBackend("get", `/salary/getSalaryNotification`, null));
  }, [salaryAccepted]);


  return (
   
    <div className="p-6 w-full bg-white rounded-lg shadow-lg">
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-bold text-gray-800">Salary Update Info</h1>
  </div>
  <div className="mb-4 max-w-4xl mx-auto">
    <ApprovalTable
      data={UserData}
      onAccept={onAccept}
      onReject={onReject}
      setCurrentBox={setCurrentBox}
    />
  </div>
  <RejectModal
    setSalaryAccepted={setSalaryAccepted}
    setCurrentBox={setCurrentBox}
    currentBox={currentBox}
    isOpen={isRejectModalOpen}
    onClose={() => setIsRejectModalOpen(false)}
  />
  <AcceptModal
    setSalaryAccepted={setSalaryAccepted}
    setCurrentBox={setCurrentBox}
    currentBox={currentBox}
    isOpen={isAcceptModalOpen}
    onClose={() => setIsAcceptModalOpen(false)}
  />
</div>
  )
}

export default ManageApproval