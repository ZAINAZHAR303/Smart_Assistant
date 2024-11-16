"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc,query,where } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { Delete } from "@mui/icons-material";
const SideBar = () => {
  const [Data, setData] = useState([]);
  const dbRef = collection(database, "users");

  useEffect(() => {
    const token = sessionStorage.getItem("Token");

    if (token) {
      try {
        onSnapshot(
          dbRef,
          (snapshot) => {
            setData(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          },
          (error) => {
            console.error("Error fetching data:", error);
          }
        );
      } catch (error) {
        console.error("Error in getData:", error);
      }
    }
  }, [dbRef]); // Dependencies array to ensure it doesn't run excessively

  const deleteDocument = (id) => {
    const fieldToDelete = doc(database, "users", id);
    deleteDoc(fieldToDelete)
      .then(() => {
        alert("Data deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting", error);
      });
  };

  return (
    <div className="w-[300px] h-[100%] fixed inset-0 top-0 bg-black rounded-tr-3xl flex flex-col items-start text-center  rounded-br-3xl ">
      <h1 className="text-[20px] text-orange-400 mt-4 ml-4 font-bold text-center">
        NarrativeForge
      </h1>
      <ul className="w-[90%] flex-col mt-20">
        {Data.map((item) => (
          <div
            key={item.id}
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)", // camelCase for webkit property
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
            className="flex items-center w-[90%]   text-start  px-4 py-2 mb-4 ml-0">
            <li className="text-white overflow-hidden  ">{item.message}</li>
            <Delete
              className="text-white"
              onClick={() => deleteDocument(item.id)}></Delete>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
