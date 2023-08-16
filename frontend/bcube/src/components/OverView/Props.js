import { overviewVideo } from "../../Redux/Redux";

export const mapStateToProps = (state) => {
    return {
      Video: state.overviewReducer.video,
    };
  };

export const mapDispatchToProps = (dispatch) => {
    return {
      overviewVideo: (obj) => dispatch(overviewVideo(obj)),
    };
  };