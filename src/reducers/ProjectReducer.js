import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQ,
  PROJECT_CREATE_SUC,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQ,
  PROJECT_DELETE_SUC,
  PROJECT_FETCH_FAIL,
  PROJECT_FETCH_REQ,
  PROJECT_FETCH_SUC,
  PROJECT_CREATE_RESET,
  PROJECT_DETAIL_REQ,
  PROJECT_DETAIL_FAIL,
  PROJECT_UPDATE_REQ,
  PROJECT_UPDATE_SUC,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_RESET,
  PROJECT_DETAIL_RESET,
  PROJECT_DETAIL_SUC,
} from "../constants/ProjectListContants";

export const ProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_FETCH_REQ:
      return { loading: true, projects: [] };
    case PROJECT_FETCH_SUC:
      return { projects: action.payload, loading: false };
    case PROJECT_FETCH_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ProjectDelReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQ:
      return { loading: true };
    case PROJECT_DELETE_SUC:
      return { loading: false, success: true };
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProjectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQ:
      return { loading: true };
    case PROJECT_CREATE_SUC:
      return { loading: false, success: true, project: action.payload };
    case PROJECT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ProjectDetailReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_DETAIL_REQ:
      return { ...state, loading: true };
    case PROJECT_DETAIL_SUC:
      return { loading: false, project: action.payload };
    case PROJECT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_DETAIL_RESET:
      return { project: {} };
    default:
      return state;
  }
};

export const ProjectUpdateReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQ:
      return { loading: true };
    case PROJECT_UPDATE_SUC:
      return {
        loading: false,
        success: true,
        project: action.payload
      };
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROJECT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
