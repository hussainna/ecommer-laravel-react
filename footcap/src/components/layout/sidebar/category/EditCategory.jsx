import axios from 'axios';
import React, { Component, useState } from 'react'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';

class EditCategory extends Component {

  state={
    slug:'',
    name:'',
    description:'',
    title:'',
    meta_descrip:'',
    meta_title:'',
    meta_keyword:'',
    status:'',
  }

  handleInput=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  async componentDidMount(){
    const category_id=this.props.match.params.id;
    console.log(category_id)

    axios.get(`api/admin/edit-category/${category_id}`).then(res=>{
      if(res.data.status===200)
      {
        this.setState({
          name:res.data.category.name,
          slug:res.data.category.slug,
          description:res.data.category.description,
          title:res.data.category.title,
          meta_descrip:res.data.category.meta_descrip,
          meta_title:res.data.category.meta_title,
          meta_keyword:res.data.category.meta_keyword,
          status:res.data.category.status

        })
      }
    })
  }

  Update=(e)=>{
    e.preventDefault()
    const category_id=this.props.match.params.id;

    const Data={
      name:this.state.name,
      slug:this.state.slug,
      description:this.state.description,
      title:this.state.title,
      meta_descrip:this.state.meta_descrip,
      meta_title:this.state.meta_title,
      meta_keyword:this.state.meta_keyword,
      status:this.state.status
    }
    axios.put(`api/category-update/${category_id}`,Data).then(res=>{
      if(res.data.status===200)
      {
        this.setState({
          name:res.data.category.name,
          slug:res.data.category.slug,
          description:res.data.category.description,
          title:res.data.category.title,
          meta_descrip:res.data.category.meta_descrip,
          meta_title:res.data.category.meta_title,
          meta_keyword:res.data.category.meta_keyword,
          status:res.data.category.status

        })
        swal(res.data.message)
      }
    })
  }

render(){

  return (
    <div className='add-category'>
             <form  id='CATEGORY_FORM' onSubmit={this.Update}>
      <div className="container">
        <h1>Category</h1>
        <hr />
        <label><b>Name</b></label>
        <input type="text" placeholder="Enter name" name="name" onChange={this.handleInput} value={this.state.name}/>
        <label><b>Title</b></label>
        <input type="text" placeholder="Enter title" name="title" onChange={this.handleInput} value={this.state.title}/>
        <label><b>Slug</b></label>
        <input type="text" placeholder="Enter slug" name="slug" onChange={this.handleInput} value={this.state.slug}/>
        <label><b>Description</b></label><hr />
        <textarea type="text" placeholder="Enter description" name="description" onChange={this.handleInput} value={this.state.description}/>
    <hr />
    
        <label><b>Meta Title</b></label>
        <input type="text" placeholder="Enter meta title" name="meta_title" onChange={this.handleInput} value={this.state.meta_title}/>
        <label><b>Meta Description</b></label>
        <input type="text" placeholder="Enter meta description" name="meta_descrip" onChange={this.handleInput} value={this.state.meta_descrip}/>
        <label><b>Meta KeyWord</b></label>
        <input type="text" placeholder="Enter Meta KeyWord" name="meta_keyword" onChange={this.handleInput} value={this.state.meta_keyword}/>
    
    
        <label><b>Status</b></label>
        <input type="checkbox" name="status" onChange={this.handleInput} value={this.state.status}/>
    
    
    
    
    
        <button type="submit" className="registerbtn">Update Category</button>
      </div>
    </form>
    
        </div>
          )
}
}

export default withRouter(EditCategory) 