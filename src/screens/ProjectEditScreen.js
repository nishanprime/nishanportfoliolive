import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail, updateProject } from "../actions/projectData";
import { modalPopActionLogin } from "../actions/showModalPopupLoginAction";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Lodaer";
import Spacer from "../components/Spacer";
import {
  PROJECT_DETAIL_RESET,
  PROJECT_UPDATE_RESET,
} from "../constants/ProjectListContants";

const ProjectEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [demoSite, setDemoSite] = useState("");
  const [gitHubRepo, setGithubRepo] = useState("");
  const [technologyUsed, setTechnologyUsed] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const projectId = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: userLoginLoading,
    error: userLoginError,
    userInfo,
  } = userLogin;

  const projectDetail = useSelector((state) => state.projectDetail);
  const {
    loading: projectLoading,
    error: projectError,
    project,
  } = projectDetail;

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = projectUpdate;

  useEffect(() => {
    console.log("Inside edit screen loadup");
    if (updateSuccess) {
      console.log("Successfully updated");

      dispatch({ type: PROJECT_UPDATE_RESET });
      history.push("/");
    }
    if (userInfo.length === 0) {
      history.push("/");
      dispatch(modalPopActionLogin(true));
    } else {
      console.log("Checking if project exist");

      if (!project.name || project._id !== projectId) {
        console.log("It dies not");

        dispatch(getProjectDetail(projectId));
      } else {
        setName(project.name);
        setDescription(project.description);
        setDemoSite(project.demoSite);
        setGithubRepo(project.gitHubRepo);
        setTechnologyUsed(project.technologyUsed);
        setImage(project.image);
      }
    }
  }, [dispatch, history, userInfo, projectId, project, updateSuccess]);

  const updateProjectHandler = (e) => {
    e.preventDefault();
    try {
      const updatedProjectObj = {
        _id: projectId,
        name,
        description,
        demoSite,
        gitHubRepo,
        technologyUsed: technologyUsed.split(","),
        image,
      };
      dispatch({ type: PROJECT_DETAIL_RESET });

      dispatch(updateProject(updatedProjectObj));
    } catch (error) {
      window.alert("Error in Technology Used Field");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    console.log(formData)
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <div>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Container>
        <h3>Edit/Add Project</h3>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {projectLoading ? (
          <Loader />
        ) : projectError ? (
          <Message variant="danger">{projectError}</Message>
        ) : (
          <Form onSubmit={updateProjectHandler}>
            <Spacer t={"30px"} />

            <Form.Group controlId="name">
              <Form.Label>
                <h5>Project Name</h5>
              </Form.Label>

              <Form.Control
                type="name"
                placeholder="Enter Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Spacer t={"30px"} />
            <Form.Group controlId="description">
              <Form.Label>
                <h5>Project Description</h5>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Write some project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Spacer t={"30px"} />
            <Form.Group controlId="demoSite">
              <Form.Label>
                <h5>Enter Demo Site URL</h5>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Site Url"
                value={demoSite}
                onChange={(e) => setDemoSite(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Spacer t={"30px"} />
            <Form.Group controlId="github">
              <Form.Label>
                <h5>Github Repo URL</h5>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Github Repo URL"
                value={gitHubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Spacer t={"30px"} />
            <Form.Group controlId="technologyUsed">
              <Form.Label>
                <h5>
                  Enter Technology Used Separated With Comma(,) & no spaces
                  between{" "}
                </h5>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Write some project description"
                value={technologyUsed}
                onChange={(e) => setTechnologyUsed(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Spacer t={"30px"} />
            <Form.Group controlId="image">
              <Form.Label>
                <h5>Paste Image URL or Upload Image</h5>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Image URL or upload"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Spacer t={"5px"} />
              <Form.File
                id="image-file"
                label="Chose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Spacer />
            <Button type="submit" variant="primary">
              Update/Add
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default ProjectEditScreen;
