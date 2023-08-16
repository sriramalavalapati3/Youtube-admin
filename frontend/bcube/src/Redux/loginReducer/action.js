import { getVideo } from "../videoReducer/action";
import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
  } from "./actiontype";

  import axios from "axios";
  export const login = (obj) => (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const email = obj.email;
    const password = obj.password;
    console.log(obj);
    axios
      .post(`http://localhost:8080/api/login`, { email, password })
      .then((res) => {
        const token = res.data.token;
        const page=0
        sessionStorage.setItem("token", token);
        dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: res.data });
        
      })
      .catch((err) => {
        dispatch({ type: LOGIN_REQUEST_FAILURE });
      });
  };
  