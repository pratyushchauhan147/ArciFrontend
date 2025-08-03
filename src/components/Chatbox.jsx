import React, { useState, useEffect, useRef } from 'react';
import { getAIResponse } from '../services/gemini';
import ChatList from './ChatComponents/ChatList';
import ChatInput from './ChatComponents/ChatInput';
import ChatLoading from './ChatComponents/ChatLoading';
import EmptyChat from './ChatComponents/EmptyChat';
const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatsRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMsg = { id: messages.length + 1, sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const aiReply = await getAIResponse(input);
      const aiMsg = {
        id: userMsg.id + 1,
        sender: "ai",
        text: aiReply.respone || aiReply.response || "No response from AI."
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: userMsg.id + 1, sender: "ai", text: "Sorry, something went wrong." + err.message }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-full border-black border-[1px] rounded-xl relative backdrop-blur-md'>
      {messages.length === 0 && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500'>
          <EmptyChat />
        </div>
      )}
      <ChatList messages={messages} ref={chatsRef} />
      {loading && <ChatLoading />}
      <ChatInput input={input} setInput={setInput} handleSend={handleSend} loading={loading} />
    </div>
  );
};

export default Chatbox;
