import React from 'react'
import './cover.css'
import { CoverData } from '../../data/Data'
import { AiOutlineArrowRight } from 'react-icons/ai'

function Cover() {
  return (
    <div className='cover S-flex'>
        {CoverData.map((item,idx)=>(
            <div className="box" key={idx}>
                <img src={item.image} alt="" />
                <div className="coverText">
                <p>{item.text}</p>
                <h3>{item.name}</h3>
                <a>
                    Shop Now
                   <i><AiOutlineArrowRight/></i>

                </a> 
                </div>
                
            </div>
        ))}
    </div>
  )
}

export default Cover