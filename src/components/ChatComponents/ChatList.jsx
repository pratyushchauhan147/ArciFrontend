import React from 'react';
import ChatMessage from './ChatMessage';

const ChatList = React.forwardRef(({ messages }, ref) => (
  <div ref={ref} className='chatlist z-20 md:w-5/6 w-full h-5/6 overflow-y-scroll'>
    {messages.map(msg => (
      <ChatMessage key={msg.id} msg={msg} />
    ))}
  </div>
));

export default ChatList;