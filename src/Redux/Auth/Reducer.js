import {
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
  } from "./ActionTypes";
  
  const initialState = {
    jwt:null,
    projectSize:0,
    user: null,
    loading: false,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
      case GET_USER_REQUEST:
        return { ...state, loading: true, error: null };
  
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return { ...state, loading: false, isAuthenticated: true, user: action.payload.user };
  
      case GET_USER_SUCCESS:
        return { ...state, loading: false, user: action.payload };
  
      case REGISTER_FAILURE:
      case LOGIN_FAILURE:
      case GET_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case LOGOUT:
        return { ...state, isAuthenticated: false,jwt: null , user: null };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  