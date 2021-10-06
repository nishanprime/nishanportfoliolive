import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalPopActionLogin } from "../actions/showModalPopupLoginAction";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Lodaer";
import Spacer from "../components/Spacer";
import {
  SKILL_DETAIL_RESET,
  SKILL_UPDATE_RESET,
} from "../constants/SkillsListContants";
import { getSkillDetail, updateSkill } from "../actions/skillsData";

const SkillEditScreen = ({ match, history }) => {
  const [techName, setTechName] = useState("");
  const [experience, setExperience] = useState("");
  const [expertiseInPercent, setExpertiseInPercent] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const skillId = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: userLoginLoading,
    error: userLoginError,
    userInfo,
  } = userLogin;

  const skillDetail = useSelector((state) => state.skillDetail);
  const { loading: skillLoading, error: skillError, skill } = skillDetail;

  const skillUpdate = useSelector((state) => state.skillUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = skillUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: SKILL_UPDATE_RESET });
      history.push("/");
    }
    if (userInfo.length === 0) {
      history.push("/");
      dispatch(modalPopActionLogin(true));
    } else {
      if (!skill.techName || skill._id !== skillId) {
        dispatch(getSkillDetail(skillId));
      } else {
        setTechName(skill.techName);
        setExperience(skill.experience);
        setExpertiseInPercent(skill.expertiseInPercent);
        setImage(skill.image);
      }
    }
  }, [dispatch, history, userInfo, skillId, skill, updateSuccess]);

  const updateProjectHandler = (e) => {
    e.preventDefault();
    try {
      const updatedSkillObj = {
        _id: skillId,
        techName,
        experience,
        expertiseInPercent,
        image,
      };
      dispatch({ type: SKILL_DETAIL_RESET });
      dispatch(updateSkill(updatedSkillObj));
    } catch (error) {
      window.alert(error + " Also make sure you add % in expertise level");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
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
        <h3>Edit/Add Skill</h3>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {skillLoading ? (
          <Loader />
        ) : skillError ? (
          <Message variant="danger">{skillError}</Message>
        ) : (
          <Form onSubmit={updateProjectHandler}>
            <Spacer t={"30px"} />

            <Form.Group controlId="techName">
              <Form.Label>
                <h5>Enter Tech/Framework Name</h5>
              </Form.Label>

              <Form.Control
                type="name"
                placeholder="Enter tech name you want to add (eg: React, Mongo, etc)"
                value={techName}
                onChange={(e) => setTechName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Spacer t={"30px"} />
            <Form.Group controlId="experience">
              <Form.Label>
                <h5>Experience Level</h5>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your experience level in (eg: 5 months, 5 years, etc)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Spacer t={"30px"} />
            <Form.Group controlId="expertiselevel">
              <Form.Label>
                <h5>Expertise Level in percentage</h5>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your expertise level in % (eg: 50%, 20%, etc)"
                value={expertiseInPercent}
                onChange={(e) => setExpertiseInPercent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Spacer t={"30px"} />

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

export default SkillEditScreen;
