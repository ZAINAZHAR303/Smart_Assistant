"use client";
import { useState } from "react";
import parse from "html-react-parser";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
export default function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const databaseRef = collection(database, "users");

  const addData = () => {
    addDoc(databaseRef, {
      message: userMessage,
      response: assistantResponse,
    })
      
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAssistantResponse = async () => {
    if (!userMessage.toLowerCase().includes("tell me a story")) {
      setAssistantResponse(
        "This assistant focuses on storytelling. Please ask for a story!"
      );
      return;
    }

    try {
      const payload = {
        inputs: `Tell a story about ${userMessage}`,
        parameters: {
          top_p: 0.9, // Allows a wider range of vocabulary for creative storytelling
          temperature: 1, // Higher temperature for creative variation
          max_new_tokens: 200,
          return_text: true,
          return_full_text: true,
          prefix: "Story:", // Helps nudge the model into narrative mode
        },
      };

      const response = await fetch(
        "https://l7sol6qs4x9pu9j7.us-east-1.aws.endpoints.huggingface.cloud",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      console.log(data);
      const assistantResponse =
        data[0]?.generated_text || "Sorry, I couldn’t process your request.";

      setAssistantResponse(assistantResponse.replace(/\n/g, "<br/>"));
    
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      setAssistantResponse("Sorry, something went wrong.");
    }
  };

  const handleSendMessage = () => {
    getAssistantResponse();
    addData();
    
  };

  return (
    <div className="w-[60%] ml-[300px] p-4 border border-gray-300 rounded-md mx-4">
      <input
        className="border w-[70%] border-gray-300 rounded-md p-2 mb-4 mx-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="tell me a story " 
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Ask Assistant
      </button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      
      <div>
        <strong>Assistant:</strong>
        <p >
          {parse(assistantResponse)}
        </p>
        
      </div>
    </div>
  );
}
