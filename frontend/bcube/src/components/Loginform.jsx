import React, { Component } from 'react'
import {login} from '../Redux/loginReducer/action'
import { connect } from 'react-redux';

import './styles/Loginform.css'
import {withNavigateHook} from './Navigate'

const mapStateToProps=(state)=>{
    return {
     isError:state.loginReducer.isError
    }
  }


 class Loginform extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         email:"",
         password:"",
         showpassword:false,
         emailError: '',
        //  passwordError: '',
      }
      this.emailChange=this.emailChange.bind(this);
      this.passwordChange=this.passwordChange.bind(this);
      this.onSubmit=this.onSubmit.bind(this);
      this.toggleShowPassword=this.toggleShowPassword.bind(this)
    }

    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    }
  
    validatePassword(password) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@\-_])[A-Za-z\d@\-_]{8,}$/;
      return passwordPattern.test(password);
    }

    emailChange(e){
      const email = e.target.value;
     
 this.setState({
    email,
    emailError:this.validateEmail(email) ? '' : '*Invalid email id',
 })
    }
    passwordChange(e){
        this.setState({
            password:e.target.value
         })
    }


    toggleShowPassword(){
      this.setState((prevState)=>({
        showpassword:!prevState.showpassword,
      }))
    }

onSubmit(e){
    e.preventDefault()
const { email,password}=this.state;
const {isError}=this.props
const obj={email,password}
this.props.login(obj)
this.setState({
    email:"",
    password:"",
})
 
console.log(isError)
 if(!isError)
 {
  this.props.toggleLoginForm()
 }

}



  render() {
const {email,password,showpassword,emailError}=this.state
const {isError}=this.props
    return (
      
          
        <div id="loginForm">
            <img src="https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette-thumbnail.png" alt="" />
           <h1>Login Form</h1>
        <form action="" id="formcontainer" onSubmit={this.onSubmit}>
        <span className="emailerror">{emailError}</span>
            <label htmlFor="email">*Email</label>
        <input type="text" id="email" onChange={this.emailChange} placeholder='enter ur email' value={email} required/><br />
        <label htmlFor="password">*Password</label>
        <input type={showpassword?"text":"password"}  id="password" placeholder='enter ur password' onChange={this.passwordChange} value={password} required/><br />
        <div id='password'>
        <input type="checkbox" name="showPassword" id="checkbox" onChange={this.toggleShowPassword} /><p>show password</p>
        </div>
        <button type="submit">login</button>
        </form>

        <h4>{isError?"login unsucessfull":null}</h4>
       
      
       </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      login: (obj) => dispatch(login(obj)),
    };
  };
  

  export default connect(mapStateToProps, mapDispatchToProps)(withNavigateHook(Loginform)) 