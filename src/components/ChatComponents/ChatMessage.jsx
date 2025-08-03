import React from 'react';

const ChatMessage = ({ msg }) => (
  <div className={`flex ${msg.sender === 'user' ? "justify-start":"justify-end"}`}>
    <div className={`flex ${msg.sender === 'user' ? "flex-row":"flex-row-reverse"}`}>
      <div className={`h-10 w-10 rounded-full ${msg.sender === 'user' ? "bg-blue-500":"bg-purple-500"}`}></div>
      <div
        className={`rounded-lg px-4 py-2 m-[6px] break-words whitespace-pre-line ${
          msg.sender === "user"
            ? "bg-[#1C1329] text-white max-w-xs"
            : "bg-white text-black max-w-md drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
        }`}
      >
        <p>{msg.text}</p>
      </div>
    </div>
  </div>
);

export default ChatMessage;