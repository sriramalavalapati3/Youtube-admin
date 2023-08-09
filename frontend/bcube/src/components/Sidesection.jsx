import React,{Component} from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import {LuLayoutDashboard} from 'react-icons/lu'
import './styles/Sidesection.css';
import { Link } from 'react-router-dom';

class Sidesection extends Component {

    render(){
        const token = sessionStorage.getItem('token'); // Example: You need to replace this with your actual token check

        

        return (
            <div className='s-cont'>
                { token && <Link to="/Dashboard">
                    <div id="Dashboard"><LuLayoutDashboard/>Dashboard</div>
                </Link> }
               { token &&<Link to="/upload">
                <div id="upload"><AiOutlineCloudUpload/>upload</div>
                </Link>
    }
               
            </div>
          )
    }
  
}

export default Sidesection