import {SEARCH_REQUEST,SEARCH_REQUEST_SUCCESS,SEARCH_REQUEST_FAILURE} from './actiontype';

const initialstate={
    isError:false,
    isLoading:false,
    searchVideos:[]

}


export const reducer =(state=initialstate,{type,payload})=>{
switch(type){
    case SEARCH_REQUEST:
        return{
            ...state,
            isLoading:true  
        }
    case SEARCH_REQUEST_SUCCESS:
        return{
            ...state,
            isLoading:false,
            searchVideos:payload
        }
    case SEARCH_REQUEST_FAILURE:
        return{
            ...state,
            isLoading:false,
            isError:true
        }
        default:return state
}
}