import React, { useEffect, useState } from 'react'
import '../category/category.css'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
function AddProduct() {

    const [CategoryItem,setCategory]=useState([])
    const [ProductItem,setProduct]=useState({
        category_id:'',
        name:'',
        slug:'',
        description:'',
        title:'',
        meta_title:'',
        meta_descrip:'',
        meta_keyword:'',
        price:'',
        qty:'',
        brand:'',
        status:'',
        popular:'',
        featured:'',
    })


    const [img,setImage]=useState([])
    const history=useHistory()

    useEffect(()=>{
        axios.get('api/all-category').then(res=>{
            if(res.data.status===200)
            {
                setCategory(res.data.category)
            }
        })
    },[])

    const handleInput=(e)=>{
        e.persist();
        setProduct({...ProductItem,[e.target.name]:e.target.value})
    }

    const handleImage=(e)=>{
        e.persist();
        setImage({image:e.target.files[0]})
    }

    const SubmitProduct=(e)=>{
        e.preventDefault()
        const fromData=new FormData();
        fromData.append('image',img.image)
        fromData.append('category_id',ProductItem.category_id)
        fromData.append('name',ProductItem.name)
        fromData.append('slug',ProductItem.slug)
        fromData.append('title',ProductItem.title)
        fromData.append('description',ProductItem.description)
        fromData.append('meta_title',ProductItem.meta_title)
        fromData.append('meta_keyword',ProductItem.meta_keyword)
        fromData.append('meta_descrip',ProductItem.meta_descrip)
        fromData.append('price',ProductItem.price)
        fromData.append('qty',ProductItem.qty)
        fromData.append('brand',ProductItem.brand)
        fromData.append('status',ProductItem.status)
        fromData.append('featured',ProductItem.featured)
        fromData.append('popular',ProductItem.popular)
        

        axios.post('api/insert-product',fromData).then(res=>{
            if(res.data.status===200)
            {
                swal('success',res.data.message)
                history.push('/admin/products')
            }
        })
    }



return (
<div className='add-category'>
         <form onSubmit={SubmitProduct}>
  <div className="container">
    <h1>Add Product</h1>
    <hr />
    <label htmlFor="name">Select Category</label>
         <select className='form-control' name="category_id" onChange={handleInput} value={ProductItem.category_id} >
            <option>Select Option</option>
            {CategoryItem.map((item,idx)=>{
                return (
                    <option value={item.id} key={idx}>{item.name}</option>
                 )
            })}
         </select><br /><br />
    <label><b>Name</b></label>
    <input type="text" placeholder="Enter name" name="name" onChange={handleInput} value={ProductItem.name} />
    <label><b>Title</b></label>
    <input type="text" placeholder="Enter title" name="title" onChange={handleInput} value={ProductItem.title}/>
    <label><b>Slug</b></label>
    <input type="text" placeholder="Enter slug" name="slug" onChange={handleInput} value={ProductItem.slug}/>
    <label><b>Description</b></label><hr />
    <textarea type="text" placeholder="Enter description" name="description" onChange={handleInput} value={ProductItem.description}/>
<hr />

    <label><b>Meta Title</b></label>
    <input type="text" placeholder="Enter meta title" name="meta_title"  onChange={handleInput} value={ProductItem.meta_title}/>
    <label><b>Meta Description</b></label>
    <input type="text" placeholder="Enter meta description" name="meta_descrip" onChange={handleInput} value={ProductItem.meta_descrip}/>
    <label><b>Meta KeyWord</b></label>
    <input type="text" placeholder="Enter Meta KeyWord" name="meta_keyword" onChange={handleInput} value={ProductItem.meta_keyword}/>

    <label><b>Price</b></label>
    <input type="text" placeholder="Enter price" name="price" onChange={handleInput} value={ProductItem.price}/>
    <label><b>qty</b></label>
    <input type="text" placeholder="Enter qty" name="qty" onChange={handleInput} value={ProductItem.qty}/>
    <label><b>brand</b></label>
    <input type="text" placeholder="Enter brand" name="brand" onChange={handleInput} value={ProductItem.brand}/>

    <label><b>Select Image</b></label>
    <input type="file" name="image" onChange={handleImage}/>



    <label><b>Status</b></label>
    <input type="checkbox" name="status" onChange={handleInput} value={ProductItem.status}/>


    <label><b>featured</b></label>
    <input type="checkbox" placeholder="Enter featured" name="featured" onChange={handleInput} value={ProductItem.featured}/>
    <label><b>popular</b></label>
    <input type="checkbox" placeholder="Enter popular" name="popular" onChange={handleInput} value={ProductItem.popular}/>




    <button type="submit" className="registerbtn">Add Category</button>
  </div>
</form>

    </div>   )
}

export default AddProduct