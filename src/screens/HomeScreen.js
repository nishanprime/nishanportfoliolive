import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Container, Image, Modal, Button } from "react-bootstrap";
import Spacer from "../components/Spacer";
import ContactScreen from "./ContactScreen";
import ProjectsScreen from "./ProjectsScreen";
import SkillsScreen from "./SkillsScreen";
import { modalPopActionLogin } from "../actions/showModalPopupLoginAction";
import { getProjectListAction } from "../actions/projectData";
import { getSkillsListAction } from "../actions/skillsData";
import Loader from "../components/Lodaer";
import Message from "../components/Message";
import { userLoginAction } from "../actions/userAuthAction";
import CreateNewProject from "../components/EditProduct";
import CreateNewSkills from "../components/EditSkills";
const HomeScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const projectList = useSelector((state) => state.projectList);
  const {
    loading: projectLoading,
    error: projectError,
    projects,
  } = projectList;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: userLoginLoading,
    error: userLoginError,
    userInfo,
  } = userLogin;

  const skillList = useSelector((state) => state.skillList);
  const { loading: skillLoading, error: skillError, skills } = skillList;

  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.modalLoginState);

  useEffect(() => {
    if (skills.length === 0 || projects.length === 0) {
      dispatch(getProjectListAction());
      dispatch(getSkillsListAction());
    }
  }, [dispatch]);
  const modalClose = () => {
    dispatch(modalPopActionLogin(false));
    // setSuccessMessage(false);
  };
  return (
    <div>
      <Container className="text-center">
        <h1>NISHAN THAPA</h1>
        <strong>Junior Web Developer / CS student / Finance Student</strong>
      </Container>

      <Container className="text-center">
        <Spacer />

        <Image width="300" src="/images/pp.png" roundedCircle fluid />
        <Spacer />
        <div
          className="card text-white bg-secondary text-center"
          style={{
            maxWidth: "100%",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div class="card-header">
            <h4>About Me</h4>
          </div>
          <div class="card-body">
            <p class="card-text">
              I am currently a sophomore at Drexel Univeristy, USA. I am
              majoring in Computer Science and minoring in Finance. I have some
              experience working across the full-stack web development. I am
              more into backend than frontend; however, I still have quite good
              understanding of frontend development. I have also built a few
              projects by myself (and as a team) and am currently looking for an
              internship/role where I can grow and develop more as a web
              developer and an individual as well. You can check my area of
              experience by clicking on "Skills" from navigation menu above.
              Please let me know if I can be of your use through "Contact" link
              above.
            </p>
          </div>
        </div>
      </Container>
      <div>
        <Spacer t="50px" />
        <Container className="text-center">
          <div id="projects">
            <h1>Projects</h1>
            <Spacer t="20px" />

            {userInfo && userInfo.name && (
              <CreateNewProject history={history} />
            )}
            <Spacer t="20px" />

            {projectLoading ? (
              <Loader />
            ) : projectError ? (
              <Message>{projectError}</Message>
            ) : (
              <div>
                <Spacer t="20px" />

                <ProjectsScreen projects={projects} history={history} />
                <Spacer t="20px" />
              </div>
            )}
          </div>

          <div id="skillsSection">
            <h1>Skills / Experience</h1>
            <Spacer t="20px" />

            {userInfo && userInfo.name && <CreateNewSkills history={history} />}
            <Spacer t="20px" />

            {skillLoading ? (
              <Loader />
            ) : skillError ? (
              <Message>{skillError}</Message>
            ) : (
              <div>
                <Container className="text-center"></Container>
                <Spacer t="20px" />
                <SkillsScreen skills={skills} history={history} />
              </div>
            )}
          </div>
        </Container>

        <Spacer t="20px" />

        <div>
          <Modal show={show} onHide={!show || userInfo}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
              <Button onClick={modalClose}>Close</Button>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(userLoginAction(email, password));
                }}
              >
                <div class="form-group">
                  <label class="form-label mt-4">
                    Only intended for Nishan
                  </label>
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="Enter authorized email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Enter Valid Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                </div>
                <Spacer />
                {userLoginError && <Message>{userLoginError}</Message>}

                {userLoginLoading && <Loader />}
                {userInfo && userInfo.name ? (
                  <Message variant="success">
                    Login Successful. You can close it now.
                  </Message>
                ) : (
                  <Button type="submit">Sign In</Button>
                )}
              </form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>

        <div id="contactSection">
          <Container className="text-center">
            <h1>Contact</h1>
          </Container>
          <ContactScreen />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
