import React from 'react'
import { BsFacebook } from 'react-icons/bs'
import { AiOutlineTwitter , AiOutlineInstagram , AiFillLinkedin } from 'react-icons/ai'
import './footer.css'
import './footer.css'
import { AccountData, contactData, TimeData } from '../../data/Data'
function Footer() {
  return (
    <div className='footer'>
        <div className="footerHead S-flex">
           <div className="logo">
               <h1><span className='span-red'>F</span>ootcap</h1>
            </div>
            <div className="icons">
                <i><BsFacebook/></i>
                <i><AiOutlineTwitter/></i>
                <i><AiOutlineInstagram/></i>
                <i><AiFillLinkedin/></i>
            </div>
        </div>

        <div className="footerBody gird-4">
          <div className="box">
          <h4>Contact Us</h4>
          {contactData.map((item,idx)=>(
              <div className="footerbox flex" key={idx}>
                <i>{item.icon}</i>
                <p>{item.text}</p>
            </div>
          ))}
          </div>

          <div className="box">
          <h4>My Account</h4>
          {AccountData.map((item,idx)=>(
              <ul key={idx}>
                <li>{item.link}</li>
              </ul>
            ))}
          </div>

          <div className="box">
          <h4>Opening Time</h4>
          {TimeData.map((item,idx)=>(
              <ul key={idx}>
                <li className='flex'>
                  <label>{item.day}</label>
                  <p>{item.time}</p>
                </li>
              </ul>
            ))}
          </div>

          <div className="box">
          <h4>Newsletter</h4>
            <p>Authoritatively morph 24/7 potentialities with error-free partnerships. </p>
            <form>
              <input type="text" placeholder='Email Address' />
              <button>Subscribe</button>
            </form>
          </div>


        </div>

    </div>
    
  )
}

export default Footer