import axios from "axios";
import {
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQ,
  PROJECT_CREATE_SUC,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQ,
  PROJECT_DELETE_SUC,
  PROJECT_DETAIL_FAIL,
  PROJECT_DETAIL_REQ,
  PROJECT_DETAIL_SUC,
  PROJECT_FETCH_FAIL,
  PROJECT_FETCH_REQ,
  PROJECT_FETCH_SUC,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQ,
  PROJECT_UPDATE_SUC,
} from "../constants/ProjectListContants";

export const getProjectListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_FETCH_REQ,
    });
    const { data } = await axios.get("/api/projects");
    dispatch({
      type: PROJECT_FETCH_SUC,
      payload: data,
    });
    localStorage.setItem(
      "projectList",
      JSON.stringify(getState().projectList.projects)
    );
  } catch (error) {
    dispatch({
      type: PROJECT_FETCH_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getProjectDetail = (id) => async (dispatch, getState) => {
  console.log("Called get project detail");

  try {
    dispatch({
      type: PROJECT_DETAIL_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/projects/${id}`, config);
    console.log(data)
    dispatch({
      type: PROJECT_DETAIL_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAIL_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const delProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/projects/delete/${id}`, config);
    dispatch({
      type: PROJECT_DELETE_SUC,
      payload: data,
    });
    dispatch({
      type: PROJECT_FETCH_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const createProject = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_CREATE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/projects`, {}, config);
    dispatch({
      type: PROJECT_CREATE_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const updateProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/projects/${project._id}`,
      project,
      config
    );
    dispatch({
      type: PROJECT_UPDATE_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};
