
import {getVideo} from '../../Redux/Redux'



export const mapStateToProps = (state) => {
  return {
    videos: state.videoReducer.videos,
    isLoading: state.videoReducer.isLoading,
    deleteStatus: state.deleteReducer.status,
    editStatus: state.updateReducer.status,
    isLogin: state.loginReducer.isLogin,
    isSuccess: state.videoReducer.isSuccess,
    video: state.updateReducer.video,
    searchVideos: state.searchReducer.searchVideos,
    updateStatus: state.updateReducer.status,
    isLoginError: state.loginReducer.isError
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {

    getVideo: (obj) => dispatch(getVideo(obj)),
  };
};


 //export default (mapStateToProps,mapDispatchToProps)