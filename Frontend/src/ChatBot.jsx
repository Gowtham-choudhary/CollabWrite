import React, { useState } from "react";
import "./App.css";
import { IoSend } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import { FiCopy } from "react-icons/fi"; // Copy icon
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../src/ChatBot.css";

const ChatBot = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    setIsLoading(true); // Show loading for the response message
    try {
      const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(msg);

      const newMessages = [
        ...messages,
        { type: "userMsg", text: msg },
        { type: "responseMsg", text: result.response.text() },
      ];

      setMessages(newMessages);
      setisResponseScreen(true);
      setMessage("");
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false); // Hide loading
    }
  };

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // alert("Copied to clipboard!");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <header className="chat-header">
          <h2>AssistMe</h2>
          <div>
            <button className="new-chat-btn" onClick={newChat}>
              Clear
            </button>
            <button className="close-btn" onClick={onClose}>
              <AiOutlineClose />
            </button>
          </div>
        </header>

        {isResponseScreen ? (
          <div className="chat-content">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={msg.type}>
                  {msg.type === "responseMsg" && (
                    <div className="response-header">
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(msg.text)}
                      >
                        <FiCopy />
                        Copy
                      </button>
                    </div>
                  )}
                  {msg.type === "responseMsg" && isLoading ? (
                    <div className="loading-indicator">
                      <div className="spinner"></div>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="welcome-message">
            <h1>Welcome to AssistMe</h1>
            <p>Start a new conversation below.</p>
          </div>
        )}

        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
          />
          {message && (
            <button className="send-btn" onClick={hitRequest}>
              <IoSend />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
