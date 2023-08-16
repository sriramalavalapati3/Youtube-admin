const mapStateToProps = (state) => {
    return {
      login: state.loginReducer.isLogin,
    };
  };


  export default (mapStateToProps)