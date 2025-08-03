import React, { useEffect, useState } from 'react'
import Chatbox from '../components/Chatbox'
import { motion } from 'framer-motion'

const Home = () => {
  const [wheelvalue, setwheelvalue] = useState(1)
  const [mousex, setmousex] = useState(window.innerWidth / 2)
  const [mousey, setmousey] = useState(window.innerHeight / 2)

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      setmousex(e.clientX)
      setmousey(e.clientY)
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Wheel handler (fix: use deltaY sign, round to 2 decimals, clamp between 0.5 and 2)
  useEffect(() => {
    const handleWheel = (event) => {
      setwheelvalue((prev) => {
        let next = prev + (event.deltaY > 0 ? 0.1 : -0.1)
        next = Math.max(0.5, Math.min(next, 2))
        return Math.round(next * 100) / 100
      })
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // MouseBox size (should match h-20 w-20, i.e., 80px)
  const mouseBoxSize = 80

  return (
    <div className="bg-cover bg-center min-h-screen">
      <motion.div
        className="z-0 fixed mouseBox bg-black rounded-full h-20 w-20 pointer-events-none"
        style={{
          left: `${mousex - mouseBoxSize / 2}px`,
          top: `${mousey - mouseBoxSize / 2}px`,
          scale: wheelvalue,
        }}
      ></motion.div>

      <div className="left hidden md:block fixed z-40 top-0 left-0 h-screen w-[20vw] bg-gray-300">d</div>
      <div className="right md:fixed top-0 right-0 h-screen md:w-[80vw] p-2 md:p-[20px]">
        <img className="fixed hidden md:block z-0 top-0 right-10" src="./bg.png" alt="" />
        <p>{wheelvalue}</p>
        <div className="bg-blend-exclusion chatbox flex z-30 justify-center items-center h-full w-full border-green-200 md:px-[8%]">
          <Chatbox />
        </div>
      </div>
    </div>
  )
}

export default Home
