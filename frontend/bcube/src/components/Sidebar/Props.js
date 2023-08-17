export const mapStateToProps = (state) => {
  return {
    login: state.loginReducer.isLogin,
  };
};