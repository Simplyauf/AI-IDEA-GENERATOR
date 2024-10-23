import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatInterface from "./components/ChatInterface";
import IdeaList from "./components/IdeaList";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function App() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [ideas, setIdeas] = useState<string[]>([]);

  const resetAll = () => {
    setChatHistory([]);
    setIdeas([]);
    toast.info("All conversations and ideas have been reset.");
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">AI-Ideas Generator</h1>
        <button
          onClick={resetAll}
          className="px-4 py-2 my-4 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Reset All
        </button>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChatInterface
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            ideas={ideas}
            setIdeas={setIdeas}
          />
          <IdeaList ideas={ideas} setIdeas={setIdeas} />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
