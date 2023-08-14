import {
  EDIT_REQUEST,
  EDIT_REQUEST_SUCCESS,
  EDIT_REQUEST_FAILURE,
} from "./actiontype";
import { EDIT_VIDEO_SUCCESS } from "../videoReducer/actiontype";
import axios from "axios";

export const editVideo = (obj) => (dispatch) => {
  dispatch({
    type: EDIT_REQUEST,
  });

  const id = obj._id;
  const Title = obj.videoTitle;
  const video = obj.videoUrl;
  const description = obj.videoDesc;
  const token = obj.token;
  const page = obj.page;
  axios
    .patch(
      `http://localhost:8080/api/update/${id}`,
      { Title, video, description },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch({ type: EDIT_REQUEST_SUCCESS, payload: res.data.Data });
      dispatch({
        type: EDIT_VIDEO_SUCCESS,
        payload: { Data: res.data.Data, page },
      });
    })
    .catch((error) => {
      dispatch({ type: EDIT_REQUEST_FAILURE });
    });
};
