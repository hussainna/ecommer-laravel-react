import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';

import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import Header from '../common/header/Header'
import './auth.css'
function CheckOut() {

    const history=useHistory()
    const [loading,setLoading]=useState(true)
    const [CartItems,setCart]=useState([])
    const [checkoutItem,setCheckout]=useState({
        firstname:'',
        lastname:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipcode:'',

    })

    const [error,setError]=useState([])
    const handleInput=(e)=>{
        e.persist()

        setCheckout({...checkoutItem,[e.target.name]:e.target.value})
    }



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

    const orderinfo_data={
        firstname:checkoutItem.firstname,
        lastname:checkoutItem.lastname,
        phone:checkoutItem.phone,
        email:checkoutItem.email,
        address:checkoutItem.address,
        city:checkoutItem.city,
        state:checkoutItem.state,
        zipcode:checkoutItem.zipcode,
        payment_mode:'paid by paypal',
        payment_id:'',
    }

    //paypal code

    // window.paypal.Buttons().render('#paypal-button')

    // let PayPalButton = paypal.Button.driver('react', { React, ReactDOM});
    // const createOrder=(data,actions)=>{
    //     return actions.order.create({
    //         purchase_units:[
    //             {
    //                 amount:{
    //                     value:totalPrice
    //                 },
    //             },
    //         ],
    //     });
    // }
    // const onApprove=(data,actions)=>{
    //     // return actions.order.capture();
    //     return actions.order.capture().then(function(details){
    //         orderinfo_data.payment_id=details.id;

    //         axios.post('api/place-order',orderinfo_data).then(res=>{
    //             if(res.data.status===200)
    //             {
    //                 swal('Order Placed Successfully',res.data.message)
    //                 setError([])
    //                 history.push('/')
    //             }
    //             else if(res.data.status===422)
    //             {
    //                 swal('all feaild are mandetory')
    //                 setError(res.data.errors)
    //             }
    //         });
    
    //     })
    // };

    //end paypal code

    const submitOrder=(e,payment_mode)=>{
        e.preventDefault();
        const data={
            firstname:checkoutItem.firstname,
            lastname:checkoutItem.lastname,
            phone:checkoutItem.phone,
            email:checkoutItem.email,
            address:checkoutItem.address,
            city:checkoutItem.city,
            state:checkoutItem.state,
            zipcode:checkoutItem.zipcode,
            payment_mode:'COD',
            payment_id:'',
        }

                axios.post('api/place-order',data).then(res=>{
                    if(res.data.status===200)
                    {
                        swal('Order Placed Successfully',res.data.message)
                        setError([])
                        history.push('/')
                    }
                    else if(res.data.status===422)
                    {
                        swal('all feaild are mandetory')
                        setError(res.data.errors)
                    }
                });
          
        
    }

    if(loading)
    {
        return <h4>Loading Check Out</h4>
    }


  return (
    <div className='place'>
        <Header/>
        <div className="flex">

        
        <div className="left">

            <div className='grid-2'>
                <div className="col">
                <label htmlFor="">First Name</label> 
               <input type="text" name="firstname" onChange={handleInput} value={checkoutItem.firstname} id="" />
                <small>{error.firstname}</small>
                </div>
                <div className="col">
                     <label htmlFor="">last Name</label>
                    <input type="text" name="lastname" onChange={handleInput} value={checkoutItem.lastname} id="" />
                    <small>{error.lastname}</small>
                </div>
                    
                   
                    <div className="col">
                         <label htmlFor="">Phone Number</label>
                        <input type="text" name="phone" onChange={handleInput} value={checkoutItem.phone} id="" />
                        <small>{error.phone}</small>
                    
                    </div>
                       
                    <div className="col">
                        <label htmlFor="">Email Address</label>
                        <input type="text" name="email" onChange={handleInput} value={checkoutItem.email} id="" />
                        <small>{error.email}</small>
                    </div>
                        
                    
                    <div className="col">
                        <label htmlFor="">Full Address</label>
                        <textarea rows='3' id="" name='address' onChange={handleInput} value={checkoutItem.address} />
                        <small>{error.address}</small>
                    </div>
                    
                        
                    
                    <div className="col">
                         <label htmlFor="">City</label>
                        <input type="text" name="city" onChange={handleInput} value={checkoutItem.city} id="" />
                        <small>{error.city}</small>
                    
                    </div>
                    
                       
                    <div className="col">
                        
                        <label htmlFor="">State</label>
                        <input type="text" name="state" onChange={handleInput} value={checkoutItem.state} id="" />
                        <small>{error.state}</small>
                    
                    
                    </div>
                    
                    <div className="col">
                                <label htmlFor="">Zip Code</label>
                        <input type="text" name="zipcode" onChange={handleInput} value={checkoutItem.zipcode} id="" />
                        <small>{error.zipcode}</small>
                    
                    </div>
                    
                
                    <div className="col">
                    <button onClick={(e)=>submitOrder(e,'cod')}>Place Order</button>
                    <div id="paypal-button"></div>
                    {/* <button onClick={(e)=>submitOrder(e,'payonline')}>
                      <PayPalButton 
                      createOrder={(data,actions)=>createOrder(data,actions)}
                      onApprove={(data,actions)=>onApprove(data,actions)}
                       />
                     </button> */}

                    </div>
                    
            </div>
            
        </div>

        <div className="right">
            
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
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
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className="card">
            <h4>Total:
                <span>{totalPrice}</span>
            </h4>
            
        </div>

        </div>
        </div>
    </div>
  )
}

export default CheckOut