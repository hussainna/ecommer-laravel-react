import React, { useState } from 'react'
import './header.css'
import { navbar } from '../../data/Data'
import { FiSearch } from 'react-icons/fi';
import { AiOutlineUser , AiOutlineClose} from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import axios from 'axios'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';





function Header() {
    
   const [ModileStyle,setMobileStyle]=useState(false);
   const history=useHistory()

   const logout=(e)=>{
    e.preventDefault()

    

    axios.post('api/logout').then(res=>{
        if(res.data.status===200)
        {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_username');
            swal('logout success')
            history('/')
        }
    })
   }


   var AuthButton=''
   if(!localStorage.getItem('auth_token'))
   {
        AuthButton=(
            <ul className='flex'>
                <li><a href='/register'>Register</a></li>
                <li><a href='/login'>Login</a></li>
            </ul>
        )
    
   }
   else{
    AuthButton=(
            <li>
                <button onClick={logout}>Logout</button>
            </li>
    )
   }

  return (
    <header className='container'>
        <div className="S-flex">
            <div className="logo">
                <h1><span className='span-red'>F</span>ootcap</h1>
            </div>
            <ul className={ModileStyle? 'small':'S-flex nav'} onClick={()=>setMobileStyle(false)}>
                {navbar.map((item,idx)=>(
                    <li key={idx}>
                        <a href={item.path}>{item.link}</a>
                    </li>
                    
                ))}
                {AuthButton}
            </ul>
            <div className="icons nav">
            <i><FiSearch /></i>
            <i><AiOutlineUser /></i>
            <i><AiOutlineHeart /></i>
            <i><BsBag /></i>
            </div>
            <div className="mobile">
                <button onClick={()=>setMobileStyle(!ModileStyle)}>
                    {
                    ModileStyle? <AiOutlineClose/>:<FaBars/>
                }
                </button>
                
            </div>
        </div>
    </header>
  )
}

export default Header