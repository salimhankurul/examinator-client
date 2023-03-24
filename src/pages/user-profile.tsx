import React, { useRef, useState, useEffect, MouseEventHandler } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap'

import Select from 'react-select'
import NotificationAlert from 'react-notification-alert'
// @ts-ignore
import sidebarImage from '../assets/img/sidebar-3.jpg'

import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import routes from '../routes'

import { useAuth } from '../global'
import { Course } from '../types'

const options = [
  { value: 'COME125', label: 'Introduction to Computer Science' },
  { value: 'COME225', label: 'Data Structures and Algorithms' },
  { value: 'COME325', label: 'Computer Networks' },
  { value: 'COME425', label: 'Database Systems' },
  { value: 'COME525', label: 'Operating Systems' },
  { value: 'COME625', label: 'Software Engineering' },
  { value: 'COME725', label: 'Artificial Intelligence' },
  { value: 'COME825', label: 'Computer Graphics' },
  { value: 'COME925', label: 'Computer Architecture' },
  { value: 'COME1025', label: 'Programming Languages' },
]

function main() {
  const { user } = useAuth()
  const [image, setImage] = useState(sidebarImage)
  const [color, setColor] = useState('black')
  const [hasImage, setHasImage] = useState(true)
  const mainPanel = useRef(null)

  return (
    <>
      <div className='wrapper'>
        <Sidebar color={color} image={hasImage ? image : ''} routes={routes} />
        <div className='main-panel' ref={mainPanel}>
          <AdminNavbar />
          <div className='content'>
            <Card className='card-user'>
              <Container fluid>
                <div className='card-image'>
                  <img alt='...' src={require('../assets/img/photo-1431578500526-4d9613015464.jpeg')}></img>
                </div>

                <Card.Body>
                  <Row xs={2}>
                    <Col md='8'>
                      <Form>
                        <Row>
                          <Col className='pr-1' md='5'>
                            <Form.Group>
                              <label>Email</label>
                              <Form.Control defaultValue={user?.email} disabled placeholder='Company' type='text'></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className='px-1' md='3'>
                            <Form.Group>
                              <label> First Name</label>
                              <Form.Control value={user?.firstName} disabled placeholder='first-name' type='text'></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className='px-1' md='3'>
                            <Form.Group>
                              <label> Last Name</label>
                              <Form.Control value={user?.lastName} disabled placeholder='last-name' type='text'></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col className='pr-1' md='5'>
                            <Form.Group>
                              <label>University</label>
                              <Form.Control defaultValue={user?.university} disabled placeholder='Company' type='text'></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className='px-1' md='3'>
                            <Form.Group>
                              <label> University ID</label>
                              <Form.Control value={user?.universityPersonalId} disabled placeholder='first-name' type='text'></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className='px-1' md='3'>
                            <Form.Group>
                              <label> User Type</label>
                              <Form.Control value={user?.userType} disabled placeholder='last-name' type='text'></Form.Control>
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
                            <Form.Group>
                              {user?.courses.map((course) => {
                                return (
                                  <Row className='pl-3 pt-2' md='2'>
                                    <Form.Control value={course.name} disabled placeholder='last-name' type='text'></Form.Control>
                                  </Row>
                                )
                              })}
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className='clearfix'></div>
                      </Form>
                    </Col>
                    <Col md='4'>
                      <Form>
                        <div className='pt-3'>
                          <a href='#pablo' onClick={(e) => e.preventDefault()}>
                            <img alt='...' className='avatar border-gray' src={require('../assets/img/faces/face-3.jpg')}></img>
                            <h5 className='title'>{ ((user?.firstName || "") + " " + (user?.lastName || ""))}</h5>
                          </a>
    
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
  )
}

export default main
