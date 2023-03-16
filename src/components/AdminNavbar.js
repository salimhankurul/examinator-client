/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Image,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import routes from "routes.js";

import { useAuth } from "../global";

function Header() {
  const { logout, profile } = useAuth();

  const [navbarProfile, setNavbarProfile] = useState();
 
  useEffect(() => {
    setNavbarProfile(profile);
  }, [profile]);

  return (
    <Navbar style={{ maxHeight: "70px" }} bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Container className="border border-secondary rounded">
                <Row>
                  <Col xs={3} className="align-self-center">
                    <Image
                      src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                      width={50}
                      height={50}
                      roundedCircle
                    />
                  </Col>
                  <Col xs={9} className="align-self-center">
                    <h4 style={{ margin: "15px 0 15px" }}> { (navbarProfile?.firstName || "") + " " + (navbarProfile?.lastName || "") }</h4>
                  </Col>
                </Row>
              </Container>
            </Nav.Item>
          </Nav>
          <Nav navbar>
            <Nav.Item>
              {" "}
              <Button variant="primary" size="lg" onClick={logout} active>
                Log Out
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

{
  /* <Button variant="outline-danger" active>
Sign Out
v<Button style={{ maxHeight: '60px' }} variant="outline-danger" active>
                Sign Out
              </Button>
</Button> */
}
