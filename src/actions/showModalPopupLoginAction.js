import {
  SHOW_MODAL_LOGIN_FAIL,
  SHOW_MODAL_LOGIN_REQ,
  SHOW_MODAL_LOGIN_SUC,
} from "../constants/showModalLogin";

export const modalPopActionLogin = (result) => (dispatch) => {
  try {
    dispatch({
      type: SHOW_MODAL_LOGIN_REQ,
    });
   
    dispatch({
      type: SHOW_MODAL_LOGIN_SUC,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: SHOW_MODAL_LOGIN_FAIL,
      payload: "ERROR",
    });
  }
};
