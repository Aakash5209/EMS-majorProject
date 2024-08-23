import React, { useContext, useEffect, useMemo, useState } from "react";
import AddModal from "./AddModel/AddModel";
import { useDispatch, useSelector } from "react-redux";
import ShowTable from "./ShowTable";
import { createGetUserDataAPIThunkRedux } from "@/lib/store/thunk/GetUserDataActionCreator";
import { createGlobalSearchUserAPIThunkRedux } from "@/lib/store/thunk/GlobalSearchUserActionCreator";
import {debounce} from 'lodash'
import { createColumnFilterAPIThunk } from "@/lib/store/thunk/GetUesrByColumnFilterActionCreator";


const ManagerUser = () => {
  const [Page, setPage] = useState(1);
  const [globalSearchPageNo, setGlobalSearchPageNo] = useState(1);
  const [columnFilterPage, setColumnFilterPage] = useState(1)
  const updatedRequest = "updatedRequest";
  const updatedSuccess = "updatedSuccess";
  const updatedFail = "updatedFail";
  const [flag, setflag] = useState(true);
  const dispatch = useDispatch();
  const [mainData, setDATA] = useState(null);

  const globalSearchUserReuqest = "globalSearchUserReuqest";
  const globalSearchUserSuccess = "globalSearchUserSuccess";
  const globalSearchUserfail = "globalSearchUserfail";

  const UserDataState = useSelector((state) => state.getUserDataApiReducerRedux);
  const {
    data: UserDatas,
    loading: UserDatasLoading,
    error: UserDataerr,
  } = UserDataState;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const SearchDebounce = debounce(setSearch, 500)
  const [columnFilterData, setColumnFilter] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    dob: "",
    gender: "",
    contactNo: "",
  });

  function nonEmptyfield(obj): boolean {
    return Object.values(obj).some(value => value !== undefined && value !== '');
  }


  const list = Array.from(
    { length: UserDatas?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  const fetchUser = () => {
    const fetchApiDataBackend = createGetUserDataAPIThunkRedux(
      updatedRequest,
      updatedSuccess,
      updatedFail
    );
    dispatch(fetchApiDataBackend("get", `/user/getAllUser/${Page}/5`, null));
  };

  const globalSearchState = useSelector((state) => state.globalSearchUserApiReducerRedux);
  const {
    data: GlobalSearchdata,
    loading: GlobalSearchlaod,
    error: GlobalSearcherror,
  } = globalSearchState;


  const columnSearchState = useSelector((state) => state.getUserByColumnFilterApiReducerRedux);
  const {
    data: ColumnSearchData,
    loading: ColumnSearchUserLoad,
    error: ColumnSearcherror,
  } = columnSearchState;

  useEffect(() => {
    if(search !== '') {
      const fetchApiDataBackend = createGlobalSearchUserAPIThunkRedux(
        globalSearchUserReuqest,
        globalSearchUserSuccess,
        globalSearchUserfail
      );
      dispatch(fetchApiDataBackend("get", `/user/getAllUserBySearch/${search}/${globalSearchPageNo}/5`, null));
    }
  }, [search, globalSearchPageNo]);

  const list1 = Array.from(
    { length: GlobalSearchdata?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  const list2 = Array.from(
    { length: ColumnSearchData?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  useEffect(()=>{
    const fetchApiDataBackend = createColumnFilterAPIThunk(
      'columnFilterRequest',
      'columnFilterSuccess',
      'columnFilterFail'
    );
    if(search === '') {
      console.log("hii i m running")
      dispatch(fetchApiDataBackend("post", `/user/getByColumnFilter/null/${columnFilterPage}/5`, columnFilterData));
    }  else {
      dispatch(fetchApiDataBackend("post", `/user/getByColumnFilter/${search}/${columnFilterPage}/5`, columnFilterData));
    }
  }, [columnFilterData, columnFilterPage, search])

  useEffect(() => {
    if (GlobalSearchdata?.User) {
      setDATA(GlobalSearchdata);
    }

    if (GlobalSearcherror) {
      alert(GlobalSearcherror);
    }
  }, [GlobalSearchdata]);

  useEffect(() => {
    if (ColumnSearchData?.User) {
      console.log(ColumnSearchData);
      setDATA(ColumnSearchData);
    }

    if (ColumnSearcherror) {
      alert(ColumnSearcherror);
    }
  }, [ColumnSearchData]);

  useEffect(() => {
    if (UserDatas?.User && search === '') {
      setDATA(UserDatas);
    }

    if (UserDataerr) {
      alert(UserDataerr);
    }
  }, [UserDatas, search]);


  useEffect(() => {
    setTimeout(() => {
      fetchUser();
    }, 200);
  }, [flag, Page]);

  const changePage = (page) => {
    setPage(page);
  };

  const changeGlobalPage = (page) => {
    setGlobalSearchPageNo(page);
  };

  const handleAddModal = () => {
    setIsModalOpen(true);
  };

  
  return (
   
    <div className="p-6 bg-white rounded-lg shadow-lg">
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-bold text-gray-800">User Info</h1>
    <button
      onClick={() => handleAddModal()}
      className="px-4 py-2 h-10 text-lg font-bold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 flex items-center justify-center"
    >
      +
    </button>
  </div>

  <input
    type="text"
    name="search"
    onChange={(e) => SearchDebounce(String(e.target.value).trim())}
    placeholder="Search..."
    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <AddModal
    setflag={setflag}
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
  />

  {mainData && Array(mainData)?.length > 0 && (
    <ShowTable
      DATA={mainData?.User}
      setColumnFilter={setColumnFilter}
      columnFilter={columnFilterData}
    />
  )}

  {nonEmptyfield(columnFilterData) === false && search.length === 0 && (
    <div className="flex justify-center mt-6">
      {list?.map((i) => (
        <span
          key={i}
          onClick={() => changePage(i)}
          className={`text-lg cursor-pointer mx-2 px-2 py-1 rounded-md hover:bg-teal-100 ${
            UserDatas?.extraInfo?.pageNo == i ? "font-bold text-teal-600" : "text-teal-500"
          }`}
        >
          {i}
        </span>
      ))}
    </div>
  )}

  {nonEmptyfield(columnFilterData) === false && search.length > 0 && (
    <div className="flex justify-center mt-6">
      {list1?.map((i) => (
        <span
          key={i}
          onClick={() => changeGlobalPage(i)}
          className={`text-lg cursor-pointer mx-2 px-2 py-1 rounded-md hover:bg-teal-100 ${
            GlobalSearchdata?.extraInfo?.pageNo == i ? "font-bold text-teal-600" : "text-teal-500"
          }`}
        >
          {i}
        </span>
      ))}
    </div>
  )}

  {nonEmptyfield(columnFilterData) && (
    <div className="flex justify-center mt-6">
      {list2?.map((i) => (
        <span
          key={i}
          onClick={() => setColumnFilterPage(i)}
          className={`text-lg cursor-pointer mx-2 px-2 py-1 rounded-md hover:bg-teal-100 ${
            ColumnSearchData?.extraInfo?.pageNo == i ? "font-bold text-teal-600" : "text-teal-500"
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

export default ManagerUser;
