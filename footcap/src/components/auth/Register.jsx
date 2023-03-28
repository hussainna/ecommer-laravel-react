import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function Register() {
    const [Input, setInput]=useState({
        name:'',
        email:'',
        password:'',
        error_list:[],
        })
        const history=useHistory();
    const handleInput=(e)=>{
        e.persist();
        setInput({...Input,[e.target.name]:e.target.value});
    }
    const SubmitInput=(e)=>{
        e.preventDefault()
        const Data={
            name:Input.name,
            email:Input.email,
            password:Input.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {

        axios.post('api/register',Data).then(res=>{
          if(res.data.status===200)
          {
            localStorage.setItem('auth_token',res.data.token);
            localStorage.setItem('auth_name',res.data.username);
            swal('Register Success',res.data.message,'Success');
            history.push('/');
          }
          else
          {
            setInput({...Input,error_list:res.data.validation_errors})

          }
        })
      })
    }
  return (
    <div>
        <form onSubmit={SubmitInput}>
        <div className="form-group">
         <label htmlFor="name">Name</label>
         <input type="name" className="form-control" onChange={handleInput} name='name' value={Input.name} required/>
         <span>{Input.error_list.name}</span>
         </div>
         <div className="form-group">
         <label htmlFor="email">Email address:</label>
         <input type="email" className="form-control" onChange={handleInput} name='email' value={Input.email} required/>
         <span>{Input.error_list.email}</span>

         </div>
         <div className="form-group">
         <label htmlFor="pwd">Password:</label>
         <input type="password" className="form-control" onChange={handleInput} name='password' value={Input.password} id="pwd" required/>
         <span>{Input.error_list.password}</span>
         </div>
         <div className="checkbox">
         <label><input type="checkbox" /> Remember me</label>
         </div>
         <button type="submit" className="btn btn-primary">Submit</button>
         </form>
    </div>
  )
}

export default Register