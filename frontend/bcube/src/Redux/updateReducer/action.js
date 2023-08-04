import {EDIT_REQUEST,EDIT_REQUEST_SUCCESS,EDIT_REQUEST_FAILURE} from './actiontype'

import axios from 'axios'

export const editVideo=(obj)=>(dispatch)=>{
    dispatch({
      type: EDIT_REQUEST
    })

 const id=obj._id;
 const Title=obj.videoTitle;
 const video=obj.videoUrl;
 const description=obj.videoDesc;
 const token=obj.token;
 console.log(obj)

 axios.patch(`http://localhost:8080/api/update/${id}`,{Title,video,description},{
  headers: {
    'Authorization': `Basic ${token}` 
  }}).then((res)=>{dispatch({type:EDIT_REQUEST_SUCCESS})})
 .catch((error)=>{dispatch({type:EDIT_REQUEST_FAILURE})})

}
