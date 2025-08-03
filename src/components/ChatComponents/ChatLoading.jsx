import React from 'react';

const ChatLoading = () => (
  <div className="flex justify-end">
    <div className="flex flex-row-reverse">
      <div className="h-10 w-10 rounded-full bg-purple-300"></div>
      <div className="rounded-lg px-4 py-2 m-[6px] bg-white text-black max-w-md drop-shadow">
        <p>AI is typing...</p>
      </div>
    </div>
  </div>
);

export default ChatLoading;