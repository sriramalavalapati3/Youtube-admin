import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
  } from "./actiontype";
  
  const initialstate = {
    isError: false,
    isLoading: false,
    token: null,
    isLogin: false,
  };
  
  export const reducer = (state = initialstate, { type, payload }) => {
    switch (type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case LOGIN_REQUEST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          token: payload,
          isLogin: true,
        };
      case LOGIN_REQUEST_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
      default:
        return state;
    }
  };
  