
import './App.css';
//import Navbars from './components/Navbars';
//import Container2 from './components/Container2';
//import Sidesection from './components/Sidesection';
import { Component } from 'react';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import { toast,ToastContainer  } from 'react-toastify';
import { connect } from 'react-redux';


import Dashboard from './components/Dashboard';
 
import Navbar from './components/Navbar';
import UploadForm from './components/UploadForm';

import Sidebar from './components/Sidebar';
import OverView from './components/OverView';
import Loginform from './components/Loginform';
//import LoginForm from './components/Form';

 //import Dashboard from './components/Dashboard';



class App extends Component {
constructor(props) {
  super(props)

  this.state = {
     loginForm:false,
    
  }

  this.toggleLoginForm=this.toggleLoginForm.bind(this)

}

toggleLoginForm(){
  const token=sessionStorage.getItem("token")
  if(token)
  {
    sessionStorage.setItem("token","")
    window.location.href="/Dashboard"
    toast.success('Login out successful!', { autoClose: 3000 })
    return;
  }

    this.setState((prevState) => ({
      loginForm: !prevState.loginForm,
     
    }));
  
 
}



  render(){
    
    const {loginForm}=this.state
    
    return (
      <Router>
 <div className="App">
       <Navbar  toggleLoginForm={this.toggleLoginForm}/>
       <div id="cont1">
    <Sidebar/>
       
        <Routes>
              {<Route path="/Dashboard" element={<Dashboard loginForm={loginForm} toggleLoginForm={this.toggleLoginForm}/>} />}
              {<Route path="/upload" element={<UploadForm  loginForm={loginForm}  />} />}
              { <Route path="/overview/:encryptedVideoId" element={<OverView/>}/> }
       </Routes>
       {this.state.loginForm && <Loginform toggleLoginForm={this.toggleLoginForm}  />}
      
       
       </div>
      
       </div>
      </Router>
     
     
     );
  }
  
  
}



export default App