import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Dashboard from './Dashboard'
import Master from './Master'
import axios from 'axios'
import swal from 'sweetalert'
import Category from './sidebar/category/Category'
import AddCategory from './sidebar/category/AddCategory'
import EditCategory from './sidebar/category/EditCategory'
import Products from './sidebar/products/Products'
import AddProduct from './sidebar/products/AddProduct'
import EditProduct from './sidebar/products/EditProduct'

function AdminPrivate({...rest}) {

    const [Auth,setAuth]=useState(false)
    const [loading,setLoading]=useState(true)
    const history=useHistory()

    useEffect(()=>{
        axios.get('api/authcheck').then(res=>{
            if(res.data.status===200)
            {
                setAuth(true)
            }
            setLoading(false)
        })
        return()=>{
            setAuth(false)
        }
    },[])


    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status===401)
        {
            swal('Unauthorized',err.response.data.message,'warning');
            history.push('/');
        }
        return Promise.reject(err);
       })
       
       axios.interceptors.response.use(function(response){
        return response;
       },function(error){
        if(error.response.status===403)
        {
            swal('warning',error.response.data.message);
            history.push('/');
        }
        else if(error.response.status===404)
        {
            swal('warning');
            history.push('/');
        }
        return Promise.reject(error);
        
       })
    

    if(loading)
    {
        return(
            <h1>Loading....</h1>
        )
    }

  return (
    <div>
        <Switch>
            <Route {...rest}
            render={({props,location})=>
            Auth?
            (<Master {...props} />):
            (<Redirect to={{pathname:'/login', state:{from:location}}} />)
        }
        path='/admin/dashboard'
        />

        <Route {...rest}
            render={({props,location})=>
            Auth?
            (<Category {...props} />):
            (<Redirect to={{pathname:'/login', state:{from:location}}} />)
        }
        path='/admin/category'
        />

<Route {...rest}
            render={({props,location})=>
            Auth?
            (<AddCategory {...props} />):
            (<Redirect to={{pathname:'/login', state:{from:location}}} />)
        }
        path='/admin/add-category'
        />

        <Route {...rest}
            render={({props,location})=>
            Auth?
            (<EditCategory {...props} />):
            (<Redirect to={{pathname:'/login', state:{from:location}}} />)
        }
        path='/admin/edit-category/:id'
        />

        <Route {...rest}
            render={({props,location})=>
            Auth?
            (<Products {...props} />):
            (<Redirect to={{pathname:'/login', state:{from:location}}} />)
        }
        path='/admin/products'
        />
        
        
        <Route {...rest}
            render={({props,location})=>
            Auth?
            (<AddProduct {...props} />):
            (<Redirect to={{pathname:'/login', state:{from:location}}} />)
        }
        path='/admin/add-product'
        />

<Route {...rest}
            render={({props,location})=>
            Auth?
            (<EditProduct {...props} />):
            (<Redirect to={{pathname:'/login', state:{from:location}}} />)
        }
        path='/admin/edit-product/:id'
        />



        </Switch>
    </div>
  )
}

export default AdminPrivate