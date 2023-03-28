import React from 'react'
import { ServicesData } from '../../data/Data'
import './services.css'
function Services() {
  return (
    <div className='services S-flex'>
        {ServicesData.map((item,idx)=>(
            <div className="box flex" key={idx}>
                <div className="icons">
                <i>{item.icon}</i>

                </div>
                <div className="boxText">
                    <h4>{item.name}</h4>
                    <p>{item.text}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Services