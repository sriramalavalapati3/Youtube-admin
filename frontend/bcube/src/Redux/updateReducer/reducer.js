import {EDIT_REQUEST,EDIT_REQUEST_SUCCESS,EDIT_REQUEST_FAILURE} from './actiontype'

const initialstate={
    isLoading:false,
    isError:false,
    status:false

}

export const reducer=(state=initialstate,{type})=>{
    switch(type){
        case EDIT_REQUEST:
            return{
                isLoading:true,  
            }
        case EDIT_REQUEST_SUCCESS:
            return{
                isLoading:false,
                status:true
            }
        case EDIT_REQUEST_FAILURE:
            return{
                isLoading:false,
                isError:true
            }
            default:return state
    }
}