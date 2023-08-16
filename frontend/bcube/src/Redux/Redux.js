// redux.js
import axios from 'axios';

// Action Types
export const GET_VIDEO_REQUEST = "GET_VIDEO_REQUEST";
export const GET_VIDEO_SUCCESS = "GET_VIDEO_SUCCESS";
export const GET_VIDEO_FAILURE = "GET_VIDEO_FAILURE";
export const GET_SEARCH_VIDEO = "GET_SEARCH_VIDEO";
export const GET_UPDATE_VIDEO = "GET_UPDATE_VIDEO";
export const EDIT_VIDEO_SUCCESS = "EDIT_VIDEO_SUCCESS";
export const DELETE_VIDEO_SUCCESS = "DELETE_VIDEO_SUCCESS";
export const GET_UPLOAD_REQUEST = "GET_UPLOAD_REQUEST";
export const GET_UPLOAD_SUCCESS = "GET_UPLOAD_SUCCESS";
export const GET_UPLOAD_FAILURE = "GET_UPLOAD_FAILURE";
export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_REQUEST_SUCCESS = 'EDIT_REQUEST_SUCCESS';
export const EDIT_REQUEST_FAILURE = 'EDIT_REQUEST_FAILURE';
export const SEARCH_REQUEST='SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS='SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_FAILURE='SEARCH_REQUEST_FAILURE';
export const VIDEO_ID_REQUEST='VIDEO_ID_REQUEST';
export const VIDEO_ID_REQUEST_SUCCESS='VIDEO_ID_REQUEST_SUCCESS';
export const VIDEO_ID_REQUEST_FAILURE='VIDEO_ID_REQUEST_FAILURE';
export const LOGIN_REQUEST="LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS="LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAILURE="LOGIN_REQUEST_FAILURE";
export const DELETE_REQUEST="DELETE_REQUEST";
export const DELETE_SUCCESFUL="DELETE_SUCCESFUL";
export const DELETE_FAILURE="DELETE_FAILURE";




// Initial State
const initialState1 = {
  isError: false,
  isLoading: false,
  videos: [],
  isSuccess: false,
};
const initialStateUpload = {
    isError: false,
    isLoading: false,
  };
const initialStateEdit = {
    isLoading: false,
    isError: null,
    status: null,
    video: {},
  };
const initialstateSearch = {
    isError: false,
    isLoading: false,
    searchVideos: [],
  };
const initialstateOverview = {
    isError: false,
    isLoading: false,
    video: {},
  };
const initialstateLogin = {
    isError: false,
    isLoading: false,
    token: null,
    isLogin: false,
  };  
 
  const initialstateDelete = {
    isLoading: false,
    isError: null,
    status: null,
  };

// Reducer
export const reducer1 = (state = initialState1, { type, payload }) => {
  switch (type) {
    case GET_VIDEO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_VIDEO_SUCCESS:
      if (payload.data.length === 0) {
        return state;
      }
      return {
        ...state,
        isLoading: false,
        videos: [...state.videos, payload],
        isSuccess: true,
      };
    case GET_VIDEO_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case EDIT_VIDEO_SUCCESS:
      const { page, Data } = payload;
      let updatedVideos = [...state.videos];
      if (updatedVideos) {
        const updatedPageData = updatedVideos[page].data.map((video) =>
          video._id === Data._id ? Data : video
        );
        updatedVideos[page].data = updatedPageData;
      }
      return {
        ...state,
        isLoading: false,
        videos: updatedVideos,
      };
    case DELETE_VIDEO_SUCCESS:
      const { data, Page } = payload;
      const deleteUpdatedVideos = [...state.videos];
      if (deleteUpdatedVideos[Page]) {
        const updatedPageData = deleteUpdatedVideos[Page].data.filter(
          (video) => video._id !== data._id
        );
        deleteUpdatedVideos[Page].data = updatedPageData;
      }
      return {
        ...state,
        isLoading: false,
        videos: deleteUpdatedVideos,
      };
    default:
      return state;
  }
};
export const reducerUpload = (state = initialStateUpload, { type, payload }) => {
    switch (type) {
      case GET_UPLOAD_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case GET_UPLOAD_SUCCESS:
        return {
          ...state,
          isLoading: false,
        };
      case GET_UPLOAD_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
export const reducerEdit = (state = initialStateEdit, { type, payload }) => {
    switch (type) {
      case EDIT_REQUEST:
        return {
          isLoading: true,
        };
      case EDIT_REQUEST_SUCCESS:
        return {
          isLoading: false,
          status: true,
          video: payload,
        };
      case EDIT_REQUEST_FAILURE:
        return {
          isLoading: false,
          isError: true,
          status: false,
        };
      default:
        return state;
    }
  }; 
  export const reducerSearch = (state = initialstateSearch, { type, payload }) => {
    switch (type) {
      case SEARCH_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case SEARCH_REQUEST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          searchVideos: [...payload],
        };
      case SEARCH_REQUEST_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
  export const reducerOverview = (state = initialstateOverview, { type, payload }) => {
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
  export const reducerLogin = (state = initialstateLogin, { type, payload }) => {
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
  export const reducerDelete = (state = initialstateDelete, { type }) => {
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
  





// Action Creator
export const getVideo = (obj) => (dispatch) => {
  dispatch({
    type: GET_VIDEO_REQUEST,
  });
  const token = obj.token;
  const page = obj.page;
  const pageView = 6;
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
      dispatch({ type: GET_VIDEO_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_VIDEO_FAILURE });
    });
};

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
export const searchVideo = (obj) => (dispatch) => {
    dispatch({
      type: SEARCH_REQUEST,
    });
    const searchInput = obj.searchInput;
    const token = obj.token;
    axios
      .get(`http://localhost:8080/api/Search?search=${searchInput}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: SEARCH_REQUEST_SUCCESS, payload: res.data });
        // dispatch({ type: GET_SEARCH_VIDEO, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SEARCH_REQUEST_FAILURE });
      });
  };
  
export const overviewVideo = (obj) => (dispatch) => {
    dispatch({
      type: VIDEO_ID_REQUEST,
    });
  
    const id = obj.originalVideoId;
    const token = obj.token;
  
    axios
      .get(`http://localhost:8080/api/data/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        const video = res.data.Data;
        console.log(res);
        dispatch({ type: VIDEO_ID_REQUEST_SUCCESS, payload: res.data.Data });
      })
      .catch((err) => {
        dispatch({ type: VIDEO_ID_REQUEST_FAILURE });
      });
  };
  
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
  
export const deleteVideo = (obj) => (dispatch) => {
    dispatch({
      type: DELETE_REQUEST,
    });
    const id = obj._id;
    const token = obj.token;
    const page = obj.page;
    console.log(id,token,page)
    axios
      .delete(`http://localhost:8080/api/delete?id=${id}&page=${page}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
        body:{
          "page":page
        }
      })
      .then((res) => {
        dispatch({ type: DELETE_SUCCESFUL });
        dispatch({type:DELETE_VIDEO_SUCCESS,payload:res.data})
      })
      .catch((error) => dispatch({ type: DELETE_FAILURE }));
  };
  

  
 


  
  
 
  