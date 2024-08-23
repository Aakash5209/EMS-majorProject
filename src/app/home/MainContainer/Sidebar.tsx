"use client";

import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../../lib/store/hooks/index";
import { setTab } from "../../../lib/store/features/tab/tabSlice";
import { useSelector } from "react-redux";
import UserContext from "@/app/context/userContext";
import { useRouter } from "next/navigation";

import { createLogoutAPIThunkRedux } from "@/lib/store/thunk/LogoutActionCreator";
import { createCookieCheckAPIThunk } from "@/lib/store/thunk/cookieCheckActionCreator";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Home" | "Manage Users" | "Manage Salary" | "Manage Approval" | "Logout"
  >("Home");
  const dispatch = useAppDispatch();

  const { user, setUser } = useContext(UserContext);
  const route = useRouter();

  const logout_request = "logout_request";
  const logoutsuccess = "logoutsuccess";
  const logoutfail = "logoutfail";

  const cookieCheckreq = "cookieCheckreq";
  const cookieChecksuccess = "cookieChecksuccess";
  const cookieCheckfail = "cookieCheckfail";

  const loginStateData = useSelector((state) => state.logoutApiReducerRedux);
  const {
    data: logoutData,
    loading: logoutLoading,
    error: logoutError,
  } = loginStateData;

  const handleTabSwitching = (value: string) => {
    dispatch(setTab(value));
    setActiveTab(value);

  };

  const logout = () => {
    const fetchApiDataBackend = createLogoutAPIThunkRedux(
      logout_request,
      logoutsuccess,
      logoutfail
    );
    dispatch(fetchApiDataBackend("get", `/auth/logout`, null));
  };

  useEffect(() => {
    if (logoutData?.msg?.length > 0) {
      window.location.reload();
      route.push("/login");
      setUser(null);

    }
  }, [logoutData]);

  const { data, loading, error } = useSelector(
    (state) => state.cookieCheckApiReducerRedux
  );

  useEffect(() => {
    const fetchApiDataBackend = createCookieCheckAPIThunk(
      cookieCheckreq,
      cookieChecksuccess,
      cookieCheckfail
    );
    dispatch(fetchApiDataBackend("get", `/auth/check-cookie`, null));
  }, []);

  useEffect(() => {
    if (data?.user) {
      setUser(data?.user);
      route.push("/home");
    }
    if (data === null) {
      route.push("/login");
    }
  }, [data]);



  return (

    <aside className="w-52 bg-gray-500 text-gray-100 h-screen p-6 flex-shrink-0 shadow-lg">


     {/* <div className="flex flex-col h-full bg-gray-100 p-4">
        <div className="flex flex-col space-y-4 flex-grow">
          <button
            className="py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 border-transparent hover:bg-gray-200 hover:border-l-blue-500"
            onClick={() => handleTabSwitching("Home")}
          >
            Home
          </button>
          <button
            className="py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 border-transparent hover:bg-gray-200 hover:border-l-blue-500"
            onClick={() => handleTabSwitching("Manage Users")}
          >
            Users
          </button>

          {user?.length > 0 && user[0]?.role !== 'Employee' && (
            <>

              <button
                className="py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 border-transparent hover:bg-gray-200 hover:border-l-blue-500"
                onClick={() => handleTabSwitching("Manage Salary")}
              >
                Salary
              </button>
              <button
                className="py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 border-transparent hover:bg-gray-200 hover:border-l-blue-500"
                onClick={() => handleTabSwitching("Manage Approval")}
              >
                Approval
              </button>
            </>
          )}
        </div>


        <div className="mt-auto">
          <button
            className="py-3 px-5 w-full text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 border-transparent hover:bg-gray-200 hover:border-l-red-500"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div> */}
      <div className="flex flex-col h-full bg-gray-100 p-4">
        <div className="flex flex-col space-y-4 flex-grow">
          <button
            className={`py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 ${
              activeTab === "Home"
                ? "border-l-blue-500 bg-gray-200"
                : "border-transparent hover:bg-gray-200 hover:border-l-blue-500"
            }`}
            onClick={() => handleTabSwitching("Home")}
          >
            Home
          </button>
          <button
            className={`py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 ${
              activeTab === "Manage Users"
                ? "border-l-blue-500 bg-gray-200"
                : "border-transparent hover:bg-gray-200 hover:border-l-blue-500"
            }`}
            onClick={() => handleTabSwitching("Manage Users")}
          >
            Users
          </button>

          {user?.length > 0 && user[0]?.role !== "Employee" && (
            <>
              <button
                className={`py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 ${
                  activeTab === "Manage Salary"
                    ? "border-l-blue-500 bg-gray-200"
                    : "border-transparent hover:bg-gray-200 hover:border-l-blue-500"
                }`}
                onClick={() => handleTabSwitching("Manage Salary")}
              >
                Salary
              </button>
              <button
                className={`py-3 px-5 text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 ${
                  activeTab === "Manage Approval"
                    ? "border-l-blue-500 bg-gray-200"
                    : "border-transparent hover:bg-gray-200 hover:border-l-blue-500"
                }`}
                onClick={() => handleTabSwitching("Manage Approval")}
              >
                Approval
              </button>
            </>
          )}
        </div>

        <div className="mt-auto">
          <button
            className={`py-3 px-5 w-full text-left text-gray-800 font-medium rounded-lg transition-colors duration-300 border-l-4 ${
              activeTab === "Logout"
                ? "border-l-red-500 bg-gray-200"
                : "border-transparent hover:bg-gray-200 hover:border-l-red-500"
            }`}
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>


    </aside>

  );
};

export default Sidebar;
