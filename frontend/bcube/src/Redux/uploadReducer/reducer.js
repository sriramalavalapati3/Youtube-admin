import { GET_UPLOAD_FAILURE, GET_UPLOAD_REQUEST, GET_UPLOAD_SUCCESS } from "./actiontype";


const initialstate={
    isError:false,
    isLoading:false,

}


export const reducer=(state=initialstate,{type,payload})=>{
switch(type){
    case GET_UPLOAD_REQUEST:
        return{
            ...state,
            isLoading:true
        }
    case GET_UPLOAD_SUCCESS:
        return{
            ...state,
            isLoading:false,
        }
    case GET_UPLOAD_FAILURE:
        return{
            ...state,
            isLoading:false,
          isError:true
        }
        default:return state
}
}