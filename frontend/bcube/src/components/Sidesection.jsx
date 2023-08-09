import React,{Component} from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import {LuLayoutDashboard} from 'react-icons/lu'
import './styles/Sidesection.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

const mapStateToProps=(state)=>{
    return{
        login:state.loginReducer.isLogin
    }
}

class Sidesection extends Component {

    render(){
        const token = sessionStorage.getItem('token'); // Example: You need to replace this with your actual token check

        const {login}=this.props

        return (
            <div className='s-cont'>
                { token||login ? <Link to="/Dashboard">
                    <div id="Dashboard"><LuLayoutDashboard/>Dashboard</div>
                </Link> : null }
               { token||login ? <Link to="/upload">
                <div id="upload"><AiOutlineCloudUpload/>upload</div>
                </Link> : null
    }
               
            </div>
          )
    }
  
}
export default connect(mapStateToProps)(Sidesection)
