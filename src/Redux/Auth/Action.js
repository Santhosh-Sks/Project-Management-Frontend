import { API_BASE_URL } from "@/config/api";
import { LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from "./ActionTypes";
import axios from "axios";

export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: REGISTER_SUCCESS, payload: data });
        }
        console.log("Register Success", data);
    } catch (error) {
        console.error("Register Error:", error);
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        }
        console.log("Login Success", data);
    } catch (error) {
        console.error("Login Error:", error);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization :`Bearer ${localStorage.getItem("jwt")}`,
            },
        });
     
            dispatch({ type: GET_USER_SUCCESS, payload: data });
    
        
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
        console.error("Get User Error:", error);
    }
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("jwt");
        dispatch({ type: "LOGOUT" });
        window.location.href = "/"; 

    } catch (error) {
        console.error("Logout Error:", error);
    }
};


