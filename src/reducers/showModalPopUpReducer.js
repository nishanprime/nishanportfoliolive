import {
  SHOW_MODAL_LOGIN_FAIL,
  SHOW_MODAL_LOGIN_REQ,
  SHOW_MODAL_LOGIN_SUC,
} from "../constants/showModalLogin";

export const showModalPopupReducer = (state = { show: false }, action) => {
  switch (action.type) {
    case SHOW_MODAL_LOGIN_REQ:
      return { ...state, loading: true, show: false };
    case SHOW_MODAL_LOGIN_SUC:
      return { loading: false, show: action.payload };
    case SHOW_MODAL_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        show: false,
        error: "Something Happened",
      };
    default:
      return state;
  }
};
