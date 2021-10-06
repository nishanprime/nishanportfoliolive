import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQ,
  USER_LOGIN_SUC,
  USER_LOGOUT,
} from "../constants/UserAuthContants";

export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
      return { loading: true, userInfo: {},  };
    case USER_LOGIN_SUC:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { userInfo: {} };
    default:
      return state;
  }
};
