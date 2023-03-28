import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function Login() {

    
  const history=useHistory();


    const [loginInput,setLogin]=useState({
        email:'',
        password:'',
        error_list:[],
    });
const handleInput=(e)=>{
    e.persist()
    setLogin({...loginInput,[e.target.name]:e.target.value});
}
const loginSubmit=(e)=>{
    e.preventDefault();
    const data={
        email:loginInput.email,
        password:loginInput.password,
    };
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/login',data).then(res=>{
        if(res.data.status === 200)
        {
            localStorage.setItem('auth_token',res.data.token);
            localStorage.setItem('auth_username',res.data.username);
            swal("Success Login")
            history.push('/');
        }
        else if(res.data.status === 401)
        {
            swal('WARNING');
        }
        else
        {
            setLogin({...loginInput,error_list:res.data.validation_errors});
        }
    });
    });
    
}
  return (
    <div className='login'>
          <form onSubmit={loginSubmit}>
  <div className="imgcontainer">
    <img src="img_avatar2.png" alt="Login Page" className="avatar" />
  </div>
  <div className="con">
    <label htmlFor="uname"><b>Email</b></label>
    <input type="text" placeholder="Enter Username" name="email" onChange={handleInput} value={loginInput.email} required />
    <span>{loginInput.error_list.email}</span>
    <label htmlFor="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} value={loginInput.password} required />
    <span>{loginInput.error_list.password}</span>
    <button type="submit">Login</button>
    <label>
      <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
    </label>
  </div>
  <div className="con" style={{backgroundColor: '#f1f1f1'}}>
    <button type="button" className="cancelbtn">Cancel</button>
    <span className="psw">Forgot <a href="#">password?</a></span>
  </div>
</form>

    </div>
  )
}

export default Login