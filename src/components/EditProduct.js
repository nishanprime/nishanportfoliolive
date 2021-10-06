import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjectListAction } from "../actions/projectData";
import { PROJECT_CREATE_RESET } from "../constants/ProjectListContants";
import Loader from "./Lodaer";
const CreateNewProject = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const projectCreate = useSelector((state) => state.projectCreate);
  const {
    loading: projectLoading,
    error: projectError,
    success: projectSuccess,
    project,
  } = projectCreate;
  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET });
    if (projectSuccess) {
      console.log(project._id, "is project id of new project");
      history.push(`/projects/${project._id}/edit`);
    } else {
      dispatch(getProjectListAction());
    }
  }, [dispatch, history, projectSuccess, userInfo, project]);
  return (
    <div>
      {projectLoading && <Loader />}
      <Button
        onClick={() => {
          dispatch(createProject());
        }}
      >
        Create New Project
      </Button>
    </div>
  );
};

export default CreateNewProject;
