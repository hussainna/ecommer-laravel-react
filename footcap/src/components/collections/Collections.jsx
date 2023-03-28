import React from 'react'
import { collectionData } from '../data/Data'
import './collection.css'
import { AiOutlineArrowRight } from 'react-icons/ai'

function Collections() {
  return (
    <div className='collection'>
        <div className="S-flex">
            {collectionData.map((item,idx)=>(
                <div className="box" key={idx}>
                    <img src={item.background==='b3e140'?item.image1:
                    item.background==='eebdea'?item.image2:
                    item.image3
                    } alt="" />
                    <div className="collText">
                      <h4>{item.name}</h4>
                      <button style={item.background==='b3e140'?{backgroundColor:'#b3e140'}:item.background==='eebdea'?{backgroundColor:'#eebdea'}:{backgroundColor:'#e7cfcf'}}>
                        Export All <i><AiOutlineArrowRight/></i>
                      </button> 
                    </div>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default Collections