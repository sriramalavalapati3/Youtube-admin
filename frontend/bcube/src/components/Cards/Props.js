import { deleteVideo,editVideo,overviewVideo } from "../../Redux/Redux";



export const mapStateToProps = (state) => {
    return {
      isLoading: state.deleteReducer.isLoading,
      isError: state.deleteReducer.isError,
      videos: state.videoReducer.videos,
    };
  };

export const mapDispatchToProps = (dispatch) => {
    return {
      deleteVideo: (obj) => {
        dispatch(deleteVideo(obj));
      },
      editVideo: (obj) => {
        dispatch(editVideo(obj));
      },
      overviewVideo: (obj) => {
        dispatch(overviewVideo(obj));
      },
    };
  };


  // export default (mapStateToProps,mapDispatchToProps)