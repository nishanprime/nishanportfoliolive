import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQ,
  USER_LOGIN_SUC,
  USER_LOGOUT,
} from "../constants/UserAuthContants";
import axios from "axios";
export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQ,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    console.log("Data from UserAuth", data)
    dispatch({
      type: USER_LOGIN_SUC,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT,
    });
  };
