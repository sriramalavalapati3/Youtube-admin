import { GET_VIDEO_FAILURE, GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS,GET_SEARCH_VIDEO } from "./actiontype";


const initialstate={
    isError:false,
    isLoading:false,
    videos:[],
    isSuccess:false
}


export const reducer=(state=initialstate,{type,payload})=>{
switch(type){
    case GET_VIDEO_REQUEST:
        return{
            ...state,
            isLoading:true
        }
    case GET_VIDEO_SUCCESS:
        return{
            ...state,
            isLoading:false,
            videos:payload,
            isSuccess:true
        }
    case GET_VIDEO_FAILURE:
        return{
            ...state,
            isLoading:false,
          isError:true
        }
    case GET_SEARCH_VIDEO:
        return{
            ...state,
            isLoading:false,
            videos:payload
        }
    
        default:return state
}
}