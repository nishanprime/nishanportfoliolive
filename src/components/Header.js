import React, { useState } from "react";
import { Route } from "react-router-dom";
import Loader from "../components/Lodaer";
import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { modalPopActionLogin } from "../actions/showModalPopupLoginAction";
import { logout } from "../actions/userAuthAction";
import axios from "axios";
const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: userLoginLoading,
    error: userLoginError,
    userInfo,
  } = userLogin;

  const projectList = useSelector((state) => state.projectList);
  const { loading: projectLoading, error: projectError } = projectList;

  const modalHandler = () => {
    console.log("I am in");
    dispatch(modalPopActionLogin(true));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  const downloadResume = async () => {
    const { data } = await axios.get("/root");
    window.open(data);
  };
  return (
    <header>
      <Container>
        <Navbar
          class="navBar"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <LinkContainer to="/">
            <Navbar.Brand style={{ marginLeft: "10px" }}>Nishan</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ marginLeft: "auto", marginRight: "10px" }}>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#skillsSection">Skills</Nav.Link>
              <Nav.Link href="#contactSection">Contact</Nav.Link>
              {userInfo && userInfo.name && (
                <NavDropdown title={"Add new data"} id="addnewdata">
                  <Nav.Link href="#addnewproject">
                    <NavDropdown.Item>Add new project</NavDropdown.Item>
                  </Nav.Link>
                  <Nav.Link href="#addnewskill">
                    <NavDropdown.Item>Add new skills</NavDropdown.Item>
                  </Nav.Link>
                  <Nav.Link href="#addnewresume">
                    <NavDropdown.Item>Add new resume</NavDropdown.Item>
                  </Nav.Link>
                </NavDropdown>
              )}
              <Button
                className="btn btn-sm"
                onClick={downloadResume}
                variant="warning"
              >
                Resume Download
              </Button>
              {userInfo && userInfo.name ? (
                <Button
                  className="btn btn-sm"
                  variant="danger"
                  onClick={logoutHandler}
                >
                  Log Out
                </Button>
              ) : (
                <Button className="btn btn-sm" onClick={modalHandler}>
                  Admin SignIn
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
