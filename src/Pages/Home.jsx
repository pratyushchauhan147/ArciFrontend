import React from 'react'
import Chatbox from '../components/Chatbox'


const Home = () => {
  return (
    <div
      className="bg-cover  bg-center min-h-screen"
    >
      
      <div className="left fixed top-0 left-0 h-screen w-[20vw] z-20 bg-gray-300">d</div>
      <div className=" right fixed top-0 right-0  z-10 h-screen w-[80vw] p-[20px] ">
        <img className='fixed top-0 right-10' src="./bg.png" alt="" />
        <div className="chatbox flex  justify-center items-center h-full w-full border-green-200 px-[8%] ">
          <Chatbox />
        </div>
      </div>
    </div>
  )
}

export default Home
