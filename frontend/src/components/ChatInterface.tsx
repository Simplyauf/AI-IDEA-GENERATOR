import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  ideas: string[];
  setIdeas: React.Dispatch<React.SetStateAction<string[]>>;
}

function ChatInterface({
  chatHistory,
  setChatHistory,
  ideas,
  setIdeas,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newUserMessage: ChatMessage = { role: "user", content: message };
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://ai-idea-generator.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: [...chatHistory, newUserMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const newAssistantMessage: ChatMessage = {
        role: "assistant",
        content: data.message,
      };
      setChatHistory((prevHistory) => [...prevHistory, newAssistantMessage]);

      // If the AI has saved an idea, add it to the ideas list
      if (data.savedIdea) {
        setIdeas((prevIdeas) => [...prevIdeas, data.savedIdea]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while sending the message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveIdea = (idea: string) => {
    if (ideas.includes(idea)) {
      toast.warn("This idea has already been saved!");
    } else {
      setIdeas((prevIdeas) => [...prevIdeas, idea]);
      toast.success("Idea saved successfully!");
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 shadow-sm"
              }`}
            >
              <p>{msg.content}</p>
              {msg.role === "assistant" && (
                <button
                  onClick={() => saveIdea(msg.content)}
                  className="mt-2 text-xs text-blue-500 transition-colors hover:text-blue-700"
                  disabled={ideas.includes(msg.content)}
                >
                  {ideas.includes(msg.content) ? "Idea Saved" : "Save Idea"}
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader size={8} color="#ffffff" /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
