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
    { const video = res.data.data;dispatch({type:SEARCH_REQUEST_SUCCESS,payload:video});dispatch({type:GET_SEARCH_VIDEO,payload:video})})
    .catch((err)=>{dispatch({type:SEARCH_REQUEST_FAILURE})})

    



}