import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { companyData, productData } from '../../data/Data'
import './products.css'
function Products() {

  const [productsItems,setProducts]=useState([])
  const [loading,setLoading]=useState(true)
  const history=useHistory()
  useEffect(()=>{
    axios.get('api/get-products').then(res=>{
      if(res.data.status===200)
      {
        setProducts(res.data.product)
      }
      setLoading(false)
    })
  },[])




  var HTMLView='';
  if(loading)
  {
    <h4>Loading</h4>
  }
  else
  {
    HTMLView=productsItems.map((item,idx)=>{
      return(
        <div className="box" key={idx}>
        <img src={`http://localhost:8000/${item.image}`} alt="" />
        <p>{item.slug}</p>
        <h4>
          <Link to={`collection/single-product/${item.id}`}>{item.name}</Link>
          </h4>
        <span>${item.price}</span>
      </div>
      )
    })
  }

  return (
    <div className='products'>
        <h3>Bestsellers Products</h3>
        <div className="company C-flex">
            {companyData.map((item,idx)=>(
                <label key={idx} style={item.background==='orange'?{backgroundColor:'#ff6f61',color:'#fff',border:'none'}:{backgroundColor:'white'}}>{item.text}</label>
            ))}
        </div>
        <div className="productsItems gird-4">
          {HTMLView}
        </div>
    </div>
  )
}

export default Products
