import {DELETE_REQUEST,DELETE_SUCCESFUL,DELETE_FAILURE} from './actiontype';
import {DELETE_VIDEO_SUCCESS} from '../videoReducer/actiontype'
import axios from 'axios'

export const deleteVideo=(obj)=>(dispatch)=>{
    dispatch({
        type:DELETE_REQUEST
    })
const id=obj._id;
const token=obj.token;
const page=obj.page
    axios.delete(`http://localhost:8080/api/delete/${id}`,{
        headers: {
          'Authorization': `Basic ${token}` 
        }}).then((res)=>{dispatch({type:DELETE_SUCCESFUL})}).catch((error)=>dispatch({type:DELETE_FAILURE}))
}

