// src/app/api/smartAssistant/route.js

export async function POST(request) {
  try {
    // Extract the user message from the request body
    const { userMessage } = await request.json();

    // Prepare the payload to send to the Hugging Face API
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

    // Set up the API URL and headers
    const API_URL = "https://l7sol6qs4x9pu9j7.us-east-1.aws.endpoints.huggingface.cloud";
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    // Check if the response is ok
    if (!response.ok) {
      console.error("Error with Hugging Face API:", response.statusText);
      return new Response("Error with Hugging Face API", { status: 500 });
    }

    // Parse the JSON response
    const data = await response.json();
    console.log("API Response Data:", data);
    // Check if 'generated_text' exists in the response
    const assistantResponse = data?.generated_text || "Sorry, I couldn’t process your request.";

    // Return the assistant's response as JSON
    return new Response(JSON.stringify({ response: assistantResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
