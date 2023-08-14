import { DELETE_REQUEST, DELETE_SUCCESFUL, DELETE_FAILURE } from "./actiontype";

const initialstate = {
  isLoading: false,
  isError: null,
  status: null,
};

export const reducer = (state = initialstate, { type }) => {
  switch (type) {
    case DELETE_REQUEST:
      return {
        isLoading: true,
      };
    case DELETE_SUCCESFUL:
      return {
        isLoading: false,
        status: true,
        isError:false
      };
    case DELETE_FAILURE:
      return {
        isLoading: false,
        isError: true,
        status:false
      };

    default:
      return state;
  }
};
