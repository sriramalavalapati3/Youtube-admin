import { searchVideo } from "../../Redux/Redux";

export const mapStateToProps = (state) => {
    console.log(state);
    return {
      searchVideos: state.searchReducer.searchVideos,
      isLoading: state.searchReducer.isLoading,
      isLogin: state.loginReducer.isLogin,
    };
  };

export const mapDispatchToProps = (dispatch) => {
    return {
      searchVideo: (obj) => dispatch(searchVideo(obj)),
    };
  };