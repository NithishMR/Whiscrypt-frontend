import React, { useState } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, how can I assist you?" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      setMessages([
        ...messages,
        { from: "user", text: userMessage },
        { from: "bot", text: "I'm here to help. What would you like to know?" }, // Simple bot response
      ]);
      setUserMessage("");
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <div
        onClick={handleToggle}
        className={`fixed bottom-5 right-5 p-4 bg-blue-500 text-white rounded-full cursor-pointer ${
          isOpen ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isOpen ? "Close Chat" : "Chat with Us"}
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white shadow-lg rounded-lg w-80 h-96 p-4 border border-gray-300">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto">
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${
                      msg.from === "bot" ? "text-left" : "text-right"
                    }`}
                  >
                    <div
                      className={`${
                        msg.from === "bot"
                          ? "bg-gray-200 text-black"
                          : "bg-blue-500 text-white"
                      } p-2 rounded-md max-w-xs`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex mt-2">
              <input
                type="text"
                value={userMessage}
                onChange={handleUserMessage}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-l-md border-gray-300"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-r-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
