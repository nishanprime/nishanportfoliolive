import {
  SKILLS_DELETE_FAIL,
  SKILLS_DELETE_REQ,
  SKILLS_DELETE_SUC,
  SKILLS_FETCH_FAIL,
  SKILLS_FETCH_REQ,
  SKILLS_FETCH_SUC,
  SKILL_CREATE_FAIL,
  SKILL_CREATE_REQ,
  SKILL_CREATE_RESET,
  SKILL_CREATE_SUC,
  SKILL_DETAIL_FAIL,
  SKILL_DETAIL_REQ,
  SKILL_DETAIL_RESET,
  SKILL_DETAIL_SUC,
  SKILL_UPDATE_FAIL,
  SKILL_UPDATE_REQ,
  SKILL_UPDATE_RESET,
  SKILL_UPDATE_SUC,
} from "../constants/SkillsListContants";

export const SkillReducer = (state = { skills: [] }, action) => {
  switch (action.type) {
    case SKILLS_FETCH_REQ:
      return { loading: true, skills: [] };
    case SKILLS_FETCH_SUC:
      return { skills: action.payload, loading: false };
    case SKILLS_FETCH_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const SkillDelReducer = (state = {}, action) => {
  switch (action.type) {
    case SKILLS_DELETE_REQ:
      return { loading: true };
    case SKILLS_DELETE_SUC:
      return { loading: false, success: true };
    case SKILLS_DELETE_FAIL:
      return { loading: false, error:action.payload};
    default:
      return state;
  }
};


export const SkillCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SKILL_CREATE_REQ:
      return { loading: true };
    case SKILL_CREATE_SUC:
      return { loading: false, success: true, skill: action.payload };
    case SKILL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const SkillDetailReducer = (state = { skill: {} }, action) => {
  switch (action.type) {
    case SKILL_DETAIL_REQ:
      return { ...state, loading: true };
    case SKILL_DETAIL_SUC:
      return { loading: false, skill: action.payload };
    case SKILL_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_DETAIL_RESET:
      return { skill: {} };
    default:
      return state;
  }
};

export const SkillUpdateReducer = (state = { skill: {} }, action) => {
  switch (action.type) {
    case SKILL_UPDATE_REQ:
      return { loading: true };
    case SKILL_UPDATE_SUC:
      return {
        loading: false,
        success: true,
        skill: action.payload
      };
    case SKILL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_UPDATE_RESET:
      return { skill: {} };
    default:
      return state;
  }
};
