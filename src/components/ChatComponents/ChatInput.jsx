import React from 'react';

const ChatInput = ({ input, setInput, handleSend, loading }) => (
  <div className="chatsinput flex justify-center md:w-5/6 w-full drop-shadow-md h-auto p-2">
    <textarea
      placeholder="Type your message here..."
      rows={1}
      value={input}
      onChange={e => setInput(e.target.value)}
      className="w-full min-h-[50px] p-2 border border-zinc-400 rounded-xl
        resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 "
    ></textarea>
    <button
      className='h-[48px] mx-1 rounded-xl w-[48px] bg-black text-white'
      type="button"
      onClick={handleSend}
      disabled={loading}
    >Send</button>
  </div>
);

export default ChatInput;