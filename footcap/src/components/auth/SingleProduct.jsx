import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../common/header/Header';
import './auth.css'


function SingleProduct(props) {

    const [Product,setProduct]=useState([])
    const [loading,setLoading]=useState(true)
    const [qty,setQty]=useState(1)
    useEffect(()=>{
        const product_id=props.match.params.id;
        axios.get(`api/single-product/${product_id}`).then(res=>{
            if(res.data.status===200)
            {
                setProduct(res.data.product)
            }

        })

    },[props.match.params.id])
    
    const handleDecrement=(e)=>{
        if(qty>1)
        {
            setQty(prevCount=>prevCount - 1)

        }
    }

    const handleIncrement=(e)=>{
        if(qty<10)
        {
            setQty(prevCount=>prevCount + 1)

        }
    }


    const AddToCartSubmit=(e)=>{
        e.preventDefault()
        const data={
            product_id:Product.id,
            product_qty:qty,
        }
        axios.post('api/insert-cart',data).then(res=>{
            if(res.data.status===201)
            {
                swal('succuss',res.data.message)
            }
            else if('error',res.data.status===409)
            {
                swal('error',res.data.message)
            }
            else if(res.data.status===401)
            {
                swal('error',res.data.message)
            }
        })
    }


  return (
    <>
    <Header/>
    <div className='auth'>
        <div className="box flex">
            <img src={`http://localhost:8000/${Product.image}`} alt="" />
            <div className="box-items">
                <h4>{Product.name}</h4>
                <p>{Product.description}</p>
                <span>{Product.price}</span>
                <div className="buttons flex">
                    <div className="qty">
                        <button onClick={handleIncrement}>+</button>
                        <input type='text' name="" value={qty} id="" />
                        <button onClick={handleDecrement}>-</button>
                    </div>
                    <button onClick={AddToCartSubmit}>Add To Cart</button>
                    <Link to='/cart'>Show Cart</Link>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default withRouter(SingleProduct)