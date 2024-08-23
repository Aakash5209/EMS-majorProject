"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createLoginAPIThunk } from "@/lib/store/thunk/loginActionCreator";
import UserContext from "../context/userContext";
import { createCookieCheckAPIThunk } from "@/lib/store/thunk/cookieCheckActionCreator";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);

  const login_request = "login_request";
  const login_success = "login_success";
  const login_fail = "login_fail";
  const cookieCheckreq = "cookieCheckreq";
  const cookieChecksuccess = "cookieChecksuccess";
  const cookieCheckfail = "cookieCheckfail";

  const loginState = useSelector((state) => state.loginApiReducerRedux);
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
  } = loginState;

  const cookieCheckState = useSelector((state) => state.cookieCheckApiReducerRedux);
  const {
    data: cookieCheckData,
    loading: cookieCheckLoading,
    error: cookieCheckError,
  } = cookieCheckState;

  console.log(loginData, loginLoading, loginError);
  console.log(cookieCheckData, cookieCheckLoading, cookieCheckError);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchApiDataBackend = createLoginAPIThunk(
      login_request,
      login_success,
      login_fail
    );
    dispatch(fetchApiDataBackend("post", `/auth/login`, { email, password }));
  };

  useEffect(() => {
    if (loginData?.user) {
      setUser(loginData?.user);
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        route.push("/home");
      }, 2000); 
    } else if (loginError) {
      toast.error('Login failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [loginData, loginError]);

  useEffect(() => {
    if (cookieCheckData?.user) {
      route.push("/home");
    }
  }, [cookieCheckData]);

  useEffect(() => {
    const fetchApiDataBackend = createCookieCheckAPIThunk(
      cookieCheckreq,
      cookieChecksuccess,
      cookieCheckfail
    );
    // dispatch(fetchApiDataBackend("get", `/user/cookieCheck`, null));
    dispatch(fetchApiDataBackend("get", `/auth/check-cookie`, null));
  }, []);

  return (
    
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
      Sign In
    </h2>
    <form onSubmit={handleSignIn}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-800 font-medium mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-800 font-medium mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Enter your password"
        />
      </div>
      <input
        type="submit"
        value={"Sign in"}
        className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
      />
    </form>
  </div>
  <ToastContainer />
</div>

  );
};

export default Signin;
