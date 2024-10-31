"use client";

import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
const SideBar = () => {
    const [Data, setData] = useState([])
    const dbRef = collection(database, "users");
  const getData = async () => {
    await getDocs(dbRef).then((response) => {
      console.log(response.docs)
      setData(response.docs.map((doc)=>doc.data()))
    });
  };
  useEffect(() => {
    
      getData();
    
  }, [getData]);
  return (
    <div className="w-[300px] h-[100%] fixed inset-0 top-0 bg-black rounded-tr-3xl flex flex-col items-start text-center  rounded-br-3xl ">
        <h1 className="text-[20px] text-orange-400 mt-4 ml-4 font-bold text-center">NarrativeForge</h1>
        <ul className="w-[90%] flex-col mt-20">
        {Data.map((item) => (
          <li key={item} className="text-white overflow-hidden w-[90%] bg-gray-500 rounded-tr-xl text-start rounded-br-xl px-4 py-2 mb-4 ml-0 ">{item.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
