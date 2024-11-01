"use client";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { auth } from "../../../firebaseConfig";
import UserMessage from "../components/UserMessage";
import { useRouter } from "next/navigation";
import Login from "../components/Login";
const Register = () => {
  const [login, setLogin] = useState(false);
  const [Data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const token = window.sessionStorage.getItem("Token");
    if (token) {
      router.push("/");
    }
  }, [router]);
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Data.email,
        Data.password
      );

      setMessage("Sign up Successfully");
      setColor("green");
      setShowMessage(true);
      sessionStorage.setItem("Token", userCredential.user.accessToken);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error.message);
      setMessage("Error signing up:", error.message);
      setColor("red");
      setShowMessage(true);
      throw error;
    }
  };

  const SignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-in successful", result.user);
      setMessage("Sign up Successfully");
      setColor("green");
      setShowMessage(true);
      sessionStorage.setItem("Token", result.user.accessToken);
    } catch (error) {
      setMessage("Error signing up:", error.message);
      setColor("red");
      setShowMessage(true);
    }
  };
  const hideUserMessage = () => {
    setShowMessage(false);
  };

  useEffect(() => {
    if (message === "Sign up Successfully") {
      router.push("/");
    }
  }, [message, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <form
        className="max-w-sm mx-auto flex flex-col items-center rounded-lg p-4 "
        onSubmit={signUp}>
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            value={Data.email}
            onChange={(e) => setdata({ ...Data, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={Data.password}
            onChange={(e) => setdata({ ...Data, password: e.target.value })}
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
        <div className="flex items-center">
          <p>if you already register please </p>

          <a
            className="text-blue-500 underline cursor-pointer ml-4"
            onClick={() => (login === true ? setLogin(false) : setLogin(true))}>
            Login
          </a>
        </div>
        <button
          onClick={SignUpWithGoogle}
          className="bg-red-400 m-4 p-4 rounded-lg text-white ">
          Signup with Google
        </button>
      </form>

      {showMessage && (
        <UserMessage
          color={color}
          message={message}
          duration={4000}
          hideMessage={hideUserMessage}
        />
      )}
      {login && <Login close={() => setLogin(false)} />}
    </div>
  );
};

export default Register;
