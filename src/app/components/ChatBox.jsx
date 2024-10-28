"use client";
import { useState } from 'react';
import parse from 'html-react-parser';
export default function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");

  const getAssistantResponse = async () => {
    try {
      // Prepare the payload
      const payload = {
        inputs: userMessage,
        parameters: {
          top_p: 0.01,
          temperature: 0.7,
          max_new_tokens: 150,
          return_text: true,
          return_full_text: true,
          return_tensors: true,
          clean_up_tokenization_spaces: true,
          prefix: "#",
          handle_long_generation: "hole"
        }
      };

      // Fetch from Hugging Face API
      const response = await fetch("https://l7sol6qs4x9pu9j7.us-east-1.aws.endpoints.huggingface.cloud", {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      console.log(data);
      const assistantResponse = data[0]?.generated_text || "Sorry, I couldn’t process your request.";
      setAssistantResponse(assistantResponse);
    } catch (error) {
      console.error("Error:", error);
      setAssistantResponse("Sorry, something went wrong.");
    }
  };

  const handleSendMessage = () => {
    getAssistantResponse();
     // Clear the input after sending
  };

  return (
    <div className='w-[80%] p-4 border border-gray-300 rounded-md mx-4 '>
      <input
      className='border w-[60%] border-gray-300 rounded-md p-2 mb-4 mx-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Ask Assistant</button>
      <div>
        <strong >Assistant:</strong> 
        <p >{parse(assistantResponse)}</p>
      </div>
    </div>
  );
}
