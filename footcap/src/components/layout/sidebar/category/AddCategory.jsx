import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import './category.css'
function AddCategory() {

  const [Input,setInput]=useState({
    name:'',
    title:'',
    slug:'',
    description:'',
    meta_title:'',
    meta_descrip:'',
    meta_keyword:'',
    status:'',
    error_list:[],
  })

  const handleInput=(e)=>{
    e.persist()
    setInput({...Input,[e.target.name]:e.target.value})
  }

  const history=useHistory()


  const submit=(e)=>{
    e.preventDefault();

    const Data={
      name:Input.name,
      title:Input.title,
      slug:Input.slug,
      description:Input.description,
      meta_title:Input.meta_title,
      meta_descrip:Input.meta_descrip,
      meta_keyword:Input.meta_keyword,
      status:Input.status,
      error_list:Input.error_list,
    }
    axios.post('api/store-category',Data).then(res=>{
      if(res.data.status===200)
      {
        swal('success',res.data.message,'success')
        document.getElementById('CATEGORY_FORM').reset();
        history.push('/admin/category')

      }
    })
  }



  return (
<div className='add-category'>
         <form onSubmit={submit} id='CATEGORY_FORM'>
  <div className="container">
    <h1>Category</h1>
    <hr />
    <label><b>Name</b></label>
    <input type="text" placeholder="Enter name" name="name" onChange={handleInput} value={Input.name}/>
    <label><b>Title</b></label>
    <input type="text" placeholder="Enter title" name="title" onChange={handleInput} value={Input.title}/>
    <label><b>Slug</b></label>
    <input type="text" placeholder="Enter slug" name="slug" onChange={handleInput} value={Input.slug}/>
    <label><b>Description</b></label><hr />
    <textarea type="text" placeholder="Enter description" name="description"onChange={handleInput} value={Input.description}/>
<hr />

    <label><b>Meta Title</b></label>
    <input type="text" placeholder="Enter meta title" name="meta_title" onChange={handleInput} value={Input.meta_title}/>
    <label><b>Meta Description</b></label>
    <input type="text" placeholder="Enter meta description" name="meta_descrip" onChange={handleInput} value={Input.meta_descrip}/>
    <label><b>Meta KeyWord</b></label>
    <input type="text" placeholder="Enter Meta KeyWord" name="meta_keyword" onChange={handleInput} value={Input.meta_keyword}/>


    <label><b>Status</b></label>
    <input type="checkbox" name="status" onChange={handleInput} value={Input.status}/>





    <button type="submit" className="registerbtn">Add Category</button>
  </div>
</form>

    </div>  )
}

export default AddCategory