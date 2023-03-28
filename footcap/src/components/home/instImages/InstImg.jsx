import React from 'react'
import { instData } from '../../data/Data'
import './instimg.css'
function InstImg() {
  return (
    <div className='instImg'>
        <div className="flex">
            {instData.map((item,idx)=>(
                <img src={item.img} key={idx} alt="" />
            ))}
        </div>
    </div>
  )
}

export default InstImg