import React from 'react';
import ChatMessage from './ChatMessage';

const ChatList = React.forwardRef(({ messages }, ref) => (
  <div ref={ref} className='chats w-5/6 h-5/6 overflow-y-scroll'>
    {messages.map(msg => (
      <ChatMessage key={msg.id} msg={msg} />
    ))}
  </div>
));

export default ChatList;