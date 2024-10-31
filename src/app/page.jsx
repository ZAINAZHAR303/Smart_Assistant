"use client"

import Image from "next/image";
import ChatBox from "./components/ChatBox";
import TypewriterText from "./components/TypewriterText";
import Login from "./components/Login";
import { useState } from "react";

export default function Home() {
  const [login,setLogin] = useState(false)
  return (
    <div className="flex flex-col items-center">
      <button onClick={()=>login === true ?setLogin(false): setLogin(true)} className="w-[5rem] h-[3rem] bg-gray-300 rounded-md flex items-center justify-center fixed right-4 top-4">Login</button>
      <div className="w-max">
        <h1 className="font-bold text-black max-sm:text-[24px] text-[36px] mt-[40px] mb-[50px] w-[20ch] overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
        Welcome to Smart Assistant!
        </h1>
      </div>

      <ChatBox />
      {
          login && (
            <Login close={()=>setLogin(false)}  />
            
          )
        }


      
    </div>
  );
}
