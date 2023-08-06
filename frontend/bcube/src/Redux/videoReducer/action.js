import { GET_VIDEO_FAILURE, GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS } from "./actiontype"
import axios from 'axios'
export const getVideo=(obj)=>(dispatch)=>{
    dispatch({
        type:GET_VIDEO_REQUEST
    })
 const token=obj.token
 console.log(token)
    axios.get(`http://localhost:8080/api/data`,{
        headers: {
          'Authorization': `Basic ${token}` 
        }}).then((res)=>
    { dispatch({type:GET_VIDEO_SUCCESS,payload:res.data});})
   .catch((err)=>{dispatch({type:GET_VIDEO_FAILURE})})


    
}