import {
  VIDEO_ID_REQUEST,
  VIDEO_ID_REQUEST_SUCCESS,
  VIDEO_ID_REQUEST_FAILURE,
} from "./actiontype";

const initialstate = {
  isError: false,
  isLoading: false,
  video: {},
};

export const reducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case VIDEO_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case VIDEO_ID_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        video: payload,
      };
    case VIDEO_ID_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
