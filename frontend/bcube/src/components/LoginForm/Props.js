 import { login } from "../../Redux/Redux";

export const mapStateToProps = (state) => {
    return {
      isError: state.loginReducer.isError,
      isLogin: state.loginReducer.isLogin,
    };
  };

export const mapDispatchToProps = (dispatch) => {
    return {
      login: (obj) => dispatch(login(obj)),
    };
  };

