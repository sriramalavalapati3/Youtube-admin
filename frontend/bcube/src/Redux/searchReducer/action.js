import {SEARCH_REQUEST,SEARCH_REQUEST_SUCCESS,SEARCH_REQUEST_FAILURE} from './actiontype';
import {GET_SEARCH_VIDEO} from '../videoReducer/actiontype'

import axios from 'axios'

export const searchVideo=(obj)=>(dispatch)=>{
dispatch({
    type:SEARCH_REQUEST
})
const searchInput=obj.searchInput;
const token=obj.token
axios.get(`http://localhost:8080/api/Search?search=${searchInput}`,{
    headers: {
      'Authorization': `Basic ${token}` 
    }}).then((res)=>
    { dispatch({type:SEARCH_REQUEST_SUCCESS,payload:res.data});dispatch({type:GET_SEARCH_VIDEO,payload:res.data})})
    .catch((err)=>{dispatch({type:SEARCH_REQUEST_FAILURE})})

    



}