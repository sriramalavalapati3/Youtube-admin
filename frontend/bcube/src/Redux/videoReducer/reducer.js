import {
    GET_VIDEO_FAILURE,
    GET_VIDEO_REQUEST,
    GET_VIDEO_SUCCESS,
    GET_SEARCH_VIDEO,
    EDIT_VIDEO_SUCCESS,
    DELETE_VIDEO_SUCCESS,
  } from "./actiontype";
  
  const initialstate = {
    isError: false,
    isLoading: false,
    videos: [],
    isSuccess: false,
  };
  
  export const reducer = (state = initialstate, { type, payload }) => {
    switch (type) {
      case GET_VIDEO_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case GET_VIDEO_SUCCESS:
        
        
          if (payload.data.length===0) {
            // If the new page is the same as the last page in the videos array, return the same state
            return state;
          }
  
         
        return {
          ...state,
          isLoading: false,
          videos:[...state.videos,payload],
          isSuccess: true,
        };
      case GET_VIDEO_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case EDIT_VIDEO_SUCCESS:
        
        const { page, Data } = payload;
        let  updatedVideos = [...state.videos];
  
        if (updatedVideos) {
          const updatedPageData = updatedVideos[page].data.map((video) =>
            video._id === Data._id ? Data : video
          );
  
          updatedVideos[page].data = updatedPageData;
        }
  
        return {
          ...state,
          isLoading: false,
          videos: updatedVideos,
        };
    case DELETE_VIDEO_SUCCESS: 
        const { data, Page } = payload;
        console.log(data,Page)
        // Create a copy of the videos array
        const deleteUpdatedVideos = [...state.videos];
        
        if (deleteUpdatedVideos[Page]) {
          // Filter out the deleted video from the specific page's data
          const updatedPageData = deleteUpdatedVideos[Page].data.filter(
            (video) => video._id !== data._id
          );
  
          // Update the page's data with the filtered data
          deleteUpdatedVideos[Page].data = updatedPageData;
        }
  
        return {
          ...state,
          isLoading: false,
          videos:deleteUpdatedVideos,
        };
      default:
        return state;
    }
  };
  