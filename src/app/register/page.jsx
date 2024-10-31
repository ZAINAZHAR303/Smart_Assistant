"use client";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../../firebaseConfig";
import UserMessage from "../components/UserMessage";
import { useRouter } from 'next/navigation'
const Register = () => {
  const [Data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter();
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Data.email,
        Data.password
      );
      await updateProfile(userCredential.user, { displayName: Data.name });

      setMessage("Sign up Successfully");
      setColor("green");
      setShowMessage(true);

      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error.message);
      setMessage("Error signing up:", error.message);
      setColor("red");
      setShowMessage(true);
      throw error;
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
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        Data.email,
        Data.password
      );
      alert("Sign in Successfully", userCredential.user);
      return userCredential.user;
    } catch (error) {
      alert("Error signing in:", error.message);
      throw error;
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-300">
      <form className="max-w-sm mx-auto" onSubmit={signUp}>
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
            placeholder="name@flowbite.com"
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
      </form>

      {showMessage && (
        <UserMessage
          color={color}
          message={message}
          duration={2000}
          hideMessage={hideUserMessage}
        />
      )}
    </div>
  );
};

export default Register;
