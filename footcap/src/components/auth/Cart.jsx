import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import Header from '../common/header/Header'
import './auth.css'
function Cart() {

    const history=useHistory()
    const [loading,setLoading]=useState(true)
    const [CartItems,setCart]=useState([])

    if(!localStorage.getItem('auth_token')){
        history.push('/')
        swal('login to go to cart')
    }

    var totalPrice=0;
    useEffect(()=>{
        axios.get('api/get-cart').then(res=>{
           if(res.data.status===200)
           {
            setCart(res.data.cart)
            setLoading(false)
           }
           else if(res.data.status===401)
           {
            history.push('/')
            swal('Error',res.data.message)
           } 
        })
    },[])

    const deleteCart=(e,id)=>{
        e.preventDefault()
        axios.delete(`api/delete-cart/${id}`).then(res=>{
            if(res.data.status===200)
            {
                swal('success',res.data.message);
                history.push('/cart')
            }
        })
    }

    if(loading)
    {
        return <h4>loading cart items</h4>
    }


  return (
    <div className='cart'>
        <Header/>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {CartItems.map((item,idx)=>{
                    totalPrice=item.products.price * item.product_qty;
                    return(
                        <tr>
                            <td><img src={`http://localhost:8000/${item.products.image}`} width='50px' alt="" /></td>
                            <td>{item.products.name}</td>
                            <td>{item.products.price}</td>
                            <td>{item.product_qty}</td>
                            <td><button onClick={(e)=>deleteCart(e,item.id)}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className="card">
            <h4>Total:
                <span>{totalPrice}</span>
            </h4>
            <hr />
            <Link className='checkout' to='/checkout'>Check Out</Link>
        </div>
    </div>
  )
}

export default Cart