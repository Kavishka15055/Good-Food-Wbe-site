import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function PrimaryButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log('Navigating to menu page...')
    navigate('/menu')
  }

  return (
    <div 
      className='flex items-center group cursor-pointer w-fit relative z-30'
      onClick={handleClick}
    >
      <button 
        className='
          bg-primary 
          h-[40px] 
          text-white 
          px-4 
          py-2 
          hover:bg-primary/90 
          active:bg-primary/80 
          transition-all 
          duration-200 
          font-semibold
          rounded-l-lg
          border-none
          outline-none
          focus:outline-none
          focus:ring-2
          focus:ring-primary/50
          relative
          z-30
        '
        type='button'
      >
        Choose Your Meal Plan
      </button>
      <div 
        className='
          bg-primaryDark 
          h-[40px] 
          w-[40px] 
          flex 
          items-center 
          justify-center 
          hover:bg-primaryDark/90 
          active:bg-primaryDark/80
          transition-all 
          duration-200 
          rounded-r-lg
          group-hover:translate-x-1
          relative
          z-30
        '
      >
        <FaArrowRight className='text-white text-base' />
      </div>
    </div>
  )
}

export default PrimaryButton