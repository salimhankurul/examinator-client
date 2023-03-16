import React, { Component, useState, useEffect } from "react";
import { useLocation, Route, Switch, Routes } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  ToggleButton,
} from "react-bootstrap";
import ChartistGraph from "react-chartist";
import NotificationAlert from "react-notification-alert";


import AdminNavbar from "components/AdminNavbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";

import Select from 'react-select'

import { useAuth } from "../global";
import { updateProfileRequest } from "api";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function main() {
  const { accessToken, profile, setProfile } = useAuth();

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  
  const [firstName, setFirstName] = React.useState("Loading...");
  const [lastName, setLastName] = React.useState("Loading...");
  const [courses, setCourses] = React.useState([]);

  const notificationAlertRef = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  const notify = ({ success, message }) => {
    const options = {
      place: "tr",
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: success ? "success" : "warning",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const onUpdateProfile = async (e) => {
      
      const body = {
          firstName: firstName,
          lastName: lastName,
          courses: courses,
      }

      const { success, error } = await updateProfileRequest({ body, accessToken });
      
      if (error) {
        notify({ message: 'Error accured while updating profile' })
        return
      } else {
        notify({ success, message: 'Profile updated successfully' })
      }

      setProfile({
        ...profile,
        firstName: firstName,
        lastName: lastName,
        courses: courses,
      })
  }

  useEffect(() => {
    if (profile) {
      console.log("ah yes profile is already inited", profile);
      setLastName(profile.lastName);
      setFirstName(profile.firstName);
      setCourses(profile.courses);
      return;
    }
  }, []);

  

  return (
    <>
    <NotificationAlert ref={notificationAlertRef} />
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Card className="card-user">
              <Container fluid>
                <div className="card-image">
                  <img
                    alt="..."
                    src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                  ></img>
                </div>

                <Card.Body>
                  <Row xs={2}>
                    <Col md="8">
                      <Form>
                        <Row>
                          <Col className="pr-1" md="5">
                            <Form.Group>
                              <label>Email</label>
                              <Form.Control
                                defaultValue="salimhan@retter.io"
                                disabled
                                placeholder="Company"
                                type="text"
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="px-1" md="3">
                            <Form.Group>
                            <label> First Name</label>
                              <Form.Control
                                value={ firstName }
                                placeholder="first-name"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="px-1" md="3">
                            <Form.Group>
                              <label> Last Name</label>
                              <Form.Control
                                value={lastName}
                                placeholder="last-name"
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <label>Subscribed Courses</label>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                          <Select
                          value={courses.map(i => ({ value: i, label: i }))}
                          isMulti
                          options={options}
                          onChange={(choices) => setCourses(choices.map(i => i.value))}
                          />
                          </Col>
                        </Row>
                        <Button
                          className="btn-fill pull-right"

                          variant="info"
                          style={{ marginTop: 20 }}
                          onClick={onUpdateProfile}
                        >
                          Update Profile
                        </Button>
                        <div className="clearfix"></div>
                      </Form>
                    </Col>
                    <Col md="4">
                      <Form>
                        <div className="author" style={{ marginTop: 0 }}>
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="avatar border-gray"
                              src={require("assets/img/faces/face-3.jpg")}
                            ></img>
                            <h5 className="title">Salimhan Kurul</h5>
                          </a>
                          <p className="description">salimhan@retter.io</p>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Container>
            </Card>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default main;
