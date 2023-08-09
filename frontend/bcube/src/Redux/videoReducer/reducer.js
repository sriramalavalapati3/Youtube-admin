import { GET_VIDEO_FAILURE, GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS,GET_SEARCH_VIDEO,EDIT_VIDEO_SUCCESS,DELETE_VIDEO_SUCCESS } from "./actiontype";


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
    case EDIT_VIDEO_SUCCESS:
        const {page,Data}=payload
        const updatedVideos = [...state.videos];

       
        if (updatedVideos[page] && updatedVideos[page].data) {
          const updatedPageData = updatedVideos[page].data.map((video) =>
            video._id === Data._id ? Data : video
          );
      
          updatedVideos[page].data = updatedPageData;
        }
      
        return{
            ...state,
            isLoading:false,
            videos:updatedVideos
        }

    case DELETE_VIDEO_SUCCESS:

        default:return state
}
}