import React, { useEffect, useState } from 'react'
import './category.css'
import TopBar from '../../Topbar/TopBar'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
function Category() {

    const [CategoryItems,setCategory]=useState([])
    const [loading,setLoading]=useState(true)
    const history=useHistory()
    useEffect(()=>{

        axios.get('api/admin/category').then(res=>{
            if(res.data.status===200)
            {
                setCategory(res.data.category)
            }
            setLoading(false)
        })

    },[])
    
    const deleteCategory=(e,id)=>{
        e.preventDefault()
        axios.delete(`api/delete-category/${id}`).then(res=>{
            if(res.data.status===200)
            {
                swal('success',res.data.message)
                history.push('/admin/category')
            }
        })
    }

    var viewHTML='';
    if(loading)
    {
        return <h4>Loading</h4>
    }
    else
    {
        viewHTML=CategoryItems.map((item,idx)=>{
            return(
            <tr key={idx}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.status}</td>
          <td>
            <Link to={`/admin/edit-category/${item.id}`} className='btn btn-success'>Edit</Link>
          </td>
          <td>
            <button className='btn btn-danger' onClick={(e)=>deleteCategory(e,item.id)} >Delete</button>
          </td>
        </tr>
            )
        })
    }

  return (
    <div className='master category'>
        <TopBar/>
        <div className="container">
          <Sidebar/>
            <div className="card">
                <div className="cardhead">
                    <h4 className='S-flex'>
                        Category
                        <a href="/admin/add-category">Add Category</a>
                    </h4>
                </div>
                <div className="cardbody">
                    <table>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                         {viewHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category