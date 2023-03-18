import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Image,
  Row,
  Col,
} from "react-bootstrap";

import { useAuth } from "../global";
import { Profile } from "../types";

function Header(): any {
  const { logout, profile } = useAuth() as any;

  const [navbarProfile, setNavbarProfile] = useState<Profile | null>();

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
                      src={require("../assets/img/photo-1431578500526-4d9613015464.jpeg")}
                      width={50}
                      height={50}
                      roundedCircle
                    />
                  </Col>
                  <Col xs={9} className="align-self-center">
                    <h4 style={{ margin: "15px 0 15px" }}>
                      {" "}
                      {(navbarProfile?.firstName || "") +
                        " " +
                        (navbarProfile?.lastName || "")}
                    </h4>
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
