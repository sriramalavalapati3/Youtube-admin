
import './App.css';
import Navbars from './components/Navbars';
import Container2 from './components/Container2';
import Sidesection from './components/Sidesection';
import { Component } from 'react';
import Upload from './components/Upload';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Overview from './components/Overview';

import Loginform from './components/Loginform';



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
       <Navbars toggleLoginForm={this.toggleLoginForm}/>
       <div id="cont1">
        <Sidesection/>
        <Routes>
              {<Route path="/Dashboard" element={<Container2  loginForm={loginForm} toggleLoginForm={this.toggleLoginForm} />} />}
              {<Route path="/upload" element={<Upload  loginForm={loginForm}  />} />}
              { <Route path="/overview/:encryptedVideoId" element={<Overview/>}/> }
       </Routes>
       {this.state.loginForm && <Loginform toggleLoginForm={this.toggleLoginForm}  />}
       
       
       </div>
       </div>
      </Router>
     
     
     );
  }
  
  
}


export default App;
