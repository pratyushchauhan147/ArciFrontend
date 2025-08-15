import React, { useState, useEffect, useRef } from 'react';
import { getAIResponse } from '../services/gemini';
// --- 1. Import the new SVG generator function ---
import { generateSvgForNewTab } from '../services/floorplanApi'; 
import ChatList from './ChatComponents/ChatList';
import ChatInput from './ChatComponents/ChatInput';
import ChatLoading from './ChatComponents/ChatLoading';
import EmptyChat from './ChatComponents/EmptyChat';

const ChatboxTest = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatsRef = useRef(null);

  useEffect(() => {
    if (chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input; // Capture the input before clearing it
    setInput('');
    setLoading(true);

    // --- 2. Check if the input is a command for the floor plan ---
    if (currentInput.trim().toLowerCase().startsWith('/floorplan')) {
      const prompt = currentInput.trim().substring('/floorplan'.length).trim();
      
      if (!prompt) {
        const errorMsg = { id: Date.now() + 1, sender: "ai", text: "Please provide a description after the /floorplan command." };
        setMessages(prev => [...prev, errorMsg]);
        setLoading(false);
        return;
      }
      
      // Add a "generating" message for better UX
      const generatingMsg = { id: Date.now() + 1, sender: "ai", text: `Got it. Generating a floor plan for: "${prompt}"...` };
      setMessages(prev => [...prev, generatingMsg]);

      try {
        const svgString = await generateSvgForNewTab(prompt);
        const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
        window.open(dataUri, '_blank');
        
        const successMsg = { id: Date.now() + 2, sender: "ai", text: "✅ Your floor plan has opened in a new tab!" };
        setMessages(prev => [...prev.filter(m => m.id !== generatingMsg.id), successMsg]);
      } catch (err) {
        const errorMsg = { id: Date.now() + 2, sender: "ai", text: `❌ Sorry, something went wrong: ${err.message}` };
        setMessages(prev => [...prev.filter(m => m.id !== generatingMsg.id), errorMsg]);
      }
    } else {
      // --- 3. This is your original logic for regular chat ---
      try {
        const aiReply = await getAIResponse(currentInput);
        const aiMsg = {
          id: Date.now() + 1,
          sender: "ai",
          text: aiReply.respone || aiReply.response || "No response from AI."
        };
        setMessages(prev => [...prev, aiMsg]);
      } catch (err) {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, sender: "ai", text: "Sorry, something went wrong. " + err.message }
        ]);
      }
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

export default ChatboxTest;