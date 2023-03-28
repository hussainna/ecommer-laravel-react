import React from 'react'
import './hero.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
function Hero() {
  return (
    <div className='hero'>
        <div className="text">
            <h2>New Summer </h2>
            <h1>Shoes Collection</h1>
            <p>Competently expedite alternative benefits whereas leading-edge catalysts for change. Globally leverage existing an expanded array of leadership. </p>
            <button>
                Shop Now
               <i><AiOutlineArrowRight/></i>
            </button>
        
        </div>
    </div>
  )
}

export default Hero