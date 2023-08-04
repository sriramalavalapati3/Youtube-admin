import { VIDEO_ID_REQUEST,VIDEO_ID_REQUEST_SUCCESS,VIDEO_ID_REQUEST_FAILURE } from "./actiontype";
import axios from 'axios'
export const overviewVideo=(obj)=>(dispatch)=>{
    dispatch({
        type:VIDEO_ID_REQUEST
    })

 const id=obj.originalVideoId;
 const token=obj.token;
 
    axios.get(`http://localhost:8080/api/data/${id}`,{
        headers: {
          'Authorization': `Basic ${token}` 
        }}).then((res)=>
    { const video = res.data.Data;console.log(res);dispatch({type:VIDEO_ID_REQUEST_SUCCESS,payload:res.data.Data});})
    .catch((err)=>{dispatch({type:VIDEO_ID_REQUEST_FAILURE})})


    
}