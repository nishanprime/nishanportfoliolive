import {
  SKILLS_DELETE_FAIL,
  SKILLS_DELETE_REQ,
  SKILLS_DELETE_SUC,
  SKILLS_FETCH_FAIL,
  SKILLS_FETCH_REQ,
  SKILLS_FETCH_SUC,
  SKILL_DETAIL_FAIL,
  SKILL_DETAIL_REQ,
  SKILL_DETAIL_SUC,
  SKILL_CREATE_REQ,
  SKILL_CREATE_SUC,
  SKILL_CREATE_FAIL,
  SKILL_UPDATE_REQ,
  SKILL_UPDATE_SUC,
  SKILL_UPDATE_FAIL,
} from "../constants/SkillsListContants";
import axios from "axios";
export const getSkillsListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SKILLS_FETCH_REQ,
    });
    const { data } = await axios.get("/api/skills");

    dispatch({
      type: SKILLS_FETCH_SUC,
      payload: data,
    });
    localStorage.setItem(
      "skillList",
      JSON.stringify(getState().skillList.skills)
    );
  } catch (error) {
    dispatch({
      type: SKILLS_FETCH_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const delSkill = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SKILLS_DELETE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/skills/delete/${id}`, config);
    dispatch({
      type: SKILLS_DELETE_SUC,
      payload: data,
    });
    dispatch({
      type: SKILLS_FETCH_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SKILLS_DELETE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

//

export const getSkillDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SKILL_DETAIL_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/skills/${id}`, config);
    dispatch({
      type: SKILL_DETAIL_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SKILL_DETAIL_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const createSkill = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SKILL_CREATE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/skills`, {}, config);
    dispatch({
      type: SKILL_CREATE_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SKILL_CREATE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const updateSkill = (skill) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SKILL_UPDATE_REQ,
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

    const { data } = await axios.put(`/api/skills/${skill._id}`, skill, config);
    dispatch({
      type: SKILL_UPDATE_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SKILL_UPDATE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};
