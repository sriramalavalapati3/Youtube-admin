import {
    GET_VIDEO_FAILURE,
    GET_VIDEO_REQUEST,
    GET_VIDEO_SUCCESS,
  } from "./actiontype";
  import axios from "axios";
  export const getVideo = (obj) => (dispatch) => {
    dispatch({
      type: GET_VIDEO_REQUEST,
    });
    const token = obj.token;
    const page = obj.page;
    const pageView = 6;
   console.log("Hi from redux")
    axios
      .get(
        `http://localhost:8080/api/data?pageoffset=${page}&pageSize=${pageView}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_VIDEO_SUCCESS, payload:res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_VIDEO_FAILURE });
      });
  };
  