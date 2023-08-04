import {DELETE_REQUEST,DELETE_SUCCESFUL,DELETE_FAILURE} from './actiontype';

const initialstate={
    isLoading:false,
    isError:false,
    status:false
}



export const reducer =(state=initialstate,{type})=>{
    switch(type){
        case DELETE_REQUEST:
            return{
                isLoading:true,
            }
        case DELETE_SUCCESFUL:
            return{
                isLoading:false,
                 status:true
            }
        case DELETE_FAILURE:
            return{
                isLoading:false,
                isError:true
            }

            default:return state
    }
}

