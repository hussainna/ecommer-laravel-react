import React, { useEffect, useState } from 'react'
import TopBar from '../../Topbar/TopBar'
import '../category/category.css'
import axios from 'axios'
import Sidebar from '../Sidebar'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
function Products() {

    const [ProductList,setProduct]=useState([]);
    const [loading,setLoading]=useState(true)
    const history=useHistory()
    useEffect(()=>{

        axios.get('api/view-products').then(res=>{
            if(res.data.status===200)
            {
                setProduct(res.data.products)
            }
            setLoading(false)
        })

    },[])

    const deleteProduct=(e,id)=>{
        e.preventDefault()
        axios.delete(`api/delete-product/${id}`).then(res=>{
            if(res.data.status===200)
            {
                swal(res.data.message)
                history.push('/admin/products')
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
        viewHTML=ProductList.map((item,idx)=>{
            return(
            <tr key={idx}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt="Image" /></td>    
          <td>
          <Link to={`/admin/edit-product/${item.id}`} className='btn btn-success'>Edit</Link>

            </td>    
          <td><button className='btn btn-danger' onClick={(e)=>deleteProduct(e,item.id)}>Delete</button></td>
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
                        Products
                        <a href="/admin/add-product">Add Products</a>
                    </h4>
                </div>
                <div className="cardbody">
                    <table>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Category Name</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
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

export default Products