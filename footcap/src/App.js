import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch ,Route } from 'react-router-dom';
import Home from './components/home/Home'
import axios from 'axios'
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import AdminPrivate from './components/layout/AdminPrivate'
import SingleProduct from './components/auth/SingleProduct'
import Cart from './components/auth/Cart';
import CheckOut from './components/auth/CheckOut';


axios.defaults.baseURL="http://localhost:8000/";
axios.defaults.headers.post['Content-Type']='application/json'
axios.defaults.headers.post['Accept']='application/json'

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token=localStorage.getItem('auth_token');
  config.headers.Authorization=token ? `Bearer ${token}` : '';
  return config;
})


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/collection/single-product/:id' render={({props,location})=>(<SingleProduct {...props} />)}/>
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/checkout' component={CheckOut}/>

          <AdminPrivate/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
