import React from 'react'
import CinemaImage from "../assets/images/cinema2.jpg"
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'

function Landing() {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/home')
  }

  return (
    <div className="w-full bg-dark">
      <img src={CinemaImage} className="w-full h-screen absolute left-0 top-0" alt="bg"/>
      <div className="min-w-[100vw] flex flex-col justify-between z-30 items-center absolute 
            bg-dark/90 dark:bg-light/90 rounded-lg backdrop-blur-sm py-32 text-center">
      <h1 className="text-5xl font-bold font-mono shadow-light">Loop Cinema</h1>
      <p className="w-[50%] my-8">Experience movie magic at its finest with state-of-the-art and a diverse film selection = your unforgettable cinematic journey starts here</p>
      <motion.button 
        className="bg-light text-dark px-3 py-2 rounded-lg"
        whileHover={{scale:1.1}}
        onClick={handleClick}
      >
        See What's Playing
      </motion.button>
      </div>
      
    </div>
  );
}

export default Landing;

