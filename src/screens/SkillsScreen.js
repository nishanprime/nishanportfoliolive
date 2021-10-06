import React, { useEffect } from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Spacer from "../components/Spacer";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { delSkill } from "../actions/skillsData";
import Loader from "../components/Lodaer";
const SkillsScreen = ({ skills, history }) => {
  const dispatch = useDispatch();
  const skillDelete = useSelector((state) => state.skillDelete);
  const { loading, success, error } = skillDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    console.log("Deleted");
  }, [success]);
  return (
    <div>
      <Container>
        <Row>
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <Col lg={4} sm={6} md={4}>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {userInfo && userInfo.token && (
                  <div>
                    <i
                      className="fas fa-trash"
                      style={{ color: "red", fontSize: "2rem" }}
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          dispatch(delSkill(skill._id));
                        }
                      }}
                    ></i>
                    <i
                      className="fas fa-edit"
                      style={{
                        color: "teal",
                        fontSize: "2rem",
                        margin: "0 20px",
                      }}
                      onClick={() => {
                        history.push(`/skills/${skill._id}/edit`);
                      }}
                    ></i>
                  </div>
                )}
                <div>
                  <Col sm={3} lg={6} md={6}>
                    <h4>{skill.techName}</h4>
                    <Image width="50" src={skill.image} roundedCircle />{" "}
                    <p>No. of year: {skill.experience}</p>
                  </Col>
                  <Col sm={9} lg={9} md={8}>
                    <div
                      class="progress"
                      style={{ position: "relative", top: "50%" }}
                    >
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: `${skill.expertiseInPercent}` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </Col>
                </div>
                <Spacer />
              </Col>
            ))
          ) : (
            <Message>No Skills added yet</Message>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SkillsScreen;
