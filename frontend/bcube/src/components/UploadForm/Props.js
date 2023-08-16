import {uploadVideo,getVideo} from '../../Redux/Redux'

export const mapStateToProps = (state) => {
    return {
      isLoading: state.uploadReducer.isLoading,
      isError: state.uploadReducer.isError,
      isLogin: state.loginReducer.isLogin,
    };
  };

 export const mapDispatchToProps = (dispatch) => {
    return {
      uploadVideo: (obj) => dispatch(uploadVideo(obj)),
      getVideo: (obj) => dispatch(getVideo(obj)),
    };
  };