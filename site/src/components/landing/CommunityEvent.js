import React from 'react'
import {motion} from 'framer-motion'

const CommunityEvent = ({name, date, summary, img}) => {
  return (
    <motion.div 
      className='w-1/4 max-w-1/3 h-[20rem] max-h-[20rem] bg-light rounded-md 
      text-dark flex flex-col items-start justify-center cursor-pointer'
      
    >
        
        
        <img 
          src={img} 
          alt={name}
          className='rounded-t-md w-full h-[80%] object-cover'
        />
        <div className='p-2'>
            <h2 className='text-xl font-semibold text-primary'>{name}</h2>
            <h6 className='text-md font-bold py-1'>{date}</h6>
            {/* <p className='py-1'>{summary}</p> */}

        </div>

        
        

        
    </motion.div>
  )
}

export default CommunityEvent