import {
    GET_UPLOAD_FAILURE,
    GET_UPLOAD_REQUEST,
    GET_UPLOAD_SUCCESS,
  } from "./actiontype";
  import axios from "axios";
  export const uploadVideo = (obj) => (dispatch) => {
    dispatch({
      type: GET_UPLOAD_REQUEST,
    });
  
    const Title = obj.videoTitle;
    const video = obj.videoUrl;
    const description = obj.videoDesc;
    const token = obj.token;
  
    axios
      .post(
        `http://localhost:8080/api/upload`,
        { Title, video, description },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_UPLOAD_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: GET_UPLOAD_FAILURE });
      });
  };
  