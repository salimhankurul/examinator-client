import React, { useRef, useState, useEffect, MouseEventHandler } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap'
import { Pagination } from '@mui/material'
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
  
  const [questionCount, setQuestionCount] = useState(0)

  function getQuestionSelect() {
    const options = []

    for (let i = 0; i < questionCount; i++) {
      options.push({
        value: i,
        label: `Question ${i + 1}`
      })
    }
    return options
  }

  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
    // onPageChange(pageNumber);
  };

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
                      <Pagination count={10} />
                        <Row>
                          <Col className='pr-1' md='5'>
                            <Form.Group>
                              <label>Question Count</label>
                              <Form.Control defaultValue={5} placeholder='Company' type='text' onChange={(e) => setQuestionCount(parseInt(e.target.value))}></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col className='pr-1' md='5'>
                            <Form.Group>
                              <label>Current Question</label>
                              <Select
                                options={getQuestionSelect()}
                                //onChange={(choices) => setCourses(choices as Course[])}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className='clearfix'></div>
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
