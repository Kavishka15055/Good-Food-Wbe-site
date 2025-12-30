import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function PrimaryButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/menu')
  }

  return (
    <>
      <div className='flex items-center group cursor-pointer'>
        <button 
          onClick={handleClick}
          className='bg-primary h-[40px] text-white px-3 py-2 hover:bg-primary/90 transition-all duration-200 font-semibold'
        >
          Choose Your Meal Plan
        </button>
        <FaArrowRight 
          className='inline-block group-hover:translate-x-2 duration-200 p-2 text-base h-[40px] w-[40px] bg-primaryDark text-white cursor-pointer hover:bg-primaryDark/90 transition-all duration-200'
          onClick={handleClick}
        />
      </div>
    </>
  )
}

export default PrimaryButton