"use client";


import ChatBox from "./components/ChatBox";

import Login from "./components/Login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "./components/SideBar";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (!token) {
      Router.push("/register");
    }
  }, []);
  const [login, setLogin] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => (login === true ? setLogin(false) : setLogin(true))}
        className="w-[5rem] h-[3rem] bg-gray-300 rounded-md flex items-center justify-center fixed right-4 top-4">
        Login
      </button>
      <div className="w-max">
        <h1 className="font-bold text-black max-sm:text-[24px] text-[36px] mt-[40px] mb-[50px] w-[20ch] overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
          Welcome to NarrativeForge!
        </h1>
      </div>
      <SideBar />
      <ChatBox />
      {login && <Login close={() => setLogin(false)} />}
    </div>
  );
}
