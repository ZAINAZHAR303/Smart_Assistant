"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"

const Login = ({ close }) => {
const router = useRouter();


  const [data,setData] = useState({
    email: "",
    password: "",
  })

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      alert("Sign in Successfully", userCredential.user);
      sessionStorage.setItem("Token", userCredential.user.accessToken);
      close();
      router.push("/");
      return userCredential.user;
    } catch (error) {
      alert("Error signing in:", error.message);
      throw error;
    }
  };
  const modelRef = useRef();

  const closeModel = (e) => {
    
    if(modelRef.current == e.target){
      close();
    }
  };
  return (
    <div
      className="outer h-[100%] w-full inset-0 fixed opacity-0.5 bg-gray-100/80 flex items-center justify-center "
      ref={modelRef}
      onClick={closeModel}>
      
        <form onSubmit={signIn} class="max-w-sm mx-auto w-[50%] bg-white p-6 rounded-xl shadow-lg    ">
          <div class="mb-5 ">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              value={data.email}
              onChange={e => setData({...data,email:e.target.value})}

              required
            />
          </div>
          <div class="mb-5">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={data.password}
              onChange={e => setData({...data,password:e.target.value})}
              required
            />
          </div>
          <div class="flex items-start mb-5">
            {/* <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div> */}
            <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              if you are a new user please{" "}
              <Link href={"/register"} className="text-blue-400 underline ">
                SignUp
              </Link>
            </label>
          </div>
          <button
            
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            sign in
          </button>
        </form>
      
    </div>
  );
};

export default Login;
