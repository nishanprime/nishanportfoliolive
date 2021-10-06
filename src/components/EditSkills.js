import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjectListAction } from "../actions/projectData";
import { createSkill, getSkillsListAction } from "../actions/skillsData";
import { PROJECT_CREATE_RESET } from "../constants/ProjectListContants";
import { SKILL_CREATE_RESET } from "../constants/SkillsListContants";
import Loader from "./Lodaer";
const CreateNewSkills = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const skillCreate = useSelector((state) => state.skillCreate);
  const {
    loading: skillLoading,
    error: skillError,
    success: skillSuccess,
    skill,
  } = skillCreate;
  useEffect(() => {
    dispatch({ type: SKILL_CREATE_RESET });
    if (skillSuccess) {
      console.log(skill._id, "is project id of new project");
      history.push(`/skills/${skill._id}/edit`);
    } else {
      dispatch(getSkillsListAction());
    }
  }, [dispatch, history, skillSuccess, userInfo, skill]);
  return (
    <div>
      {skillLoading && <Loader />}
      <Button
        onClick={() => {
          dispatch(createSkill());
        }}
      >
        Create New Skill
      </Button>
    </div>
  );
};

export default CreateNewSkills;
