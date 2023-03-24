import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import NotificationAlert from 'react-notification-alert'

import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import routes from '../routes'

// @ts-ignore
import sidebarImage from '../assets/img/sidebar-3.jpg'

import { useAuth } from '../global'

function main() {
  const { accessToken, user } = useAuth()

  const [image, setImage] = React.useState(sidebarImage)
  const [color, setColor] = React.useState('black')

  const location = useLocation()
  const mainPanel = React.useRef(null)

  const notificationAlertRef = React.useRef<any>(null)

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainPanel.current.scrollTop = 0;
  //   if (
  //     window.innerWidth < 993 &&
  //     document.documentElement.className.indexOf("nav-open") !== -1
  //   ) {
  //     document.documentElement.classList.toggle("nav-open");
  //     var element = document.getElementById("bodyClick");
  //     element.parentNode.removeChild(element);
  //   }
  // }, [location]);

  const notify = ({ success, message }: { success?: string; message: string }) => {
    const options = {
      place: 'tr',
      message: (
        <div>
          <div>
            <b> {message} </b>
          </div>
        </div>
      ),
      type: success ? 'success' : 'warning',
      icon: 'nc-icon nc-bell-55',
      autoDismiss: 7,
    }
    notificationAlertRef.current.notificationAlert(options)
  }

  const getCards = (courseName: string) => {
    return (
      <Card border='primary' style={{ width: '18rem' }}>
        <Card.Header style={{ fontSize: '24px' }}>{courseName}</Card.Header>
        <Card.Body>
          <Card.Title className='text-right' style={{ fontSize: '12px' }}>
            18:45 22/02/23
          </Card.Title>
          <ul>
            <li>
              <strong>Duration:</strong> 60 minutes
            </li>
            <li>
              <strong>Question Type:</strong> Multiple Choice
            </li>
            <li>
              <strong>Number of Questions:</strong> 40
            </li>
            <li>
              <strong>Passing Score:</strong> 70%
            </li>
          </ul>

          <div className='d-flex flex-column align-items-center justify-content-center'>
            <Button variant='primary'>Start Exam</Button>
          </div>
        </Card.Body>
      </Card>
    )
  }

  const MyComponent = () => {
    const courseList = user!.courses
    return (
      <Row xs={1} sm={2} md={3} className='g-4'>
        {courseList.map((courseName, index) => (
          <Col className='d-flex justify-content-center align-items-center' key={index}>
            {getCards(courseName.name)}
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <div className='wrapper'>
        <Sidebar color={color} image={image} routes={routes} />
        <div className='main-panel' ref={mainPanel}>
          <AdminNavbar />
          <div className='content'>
            <Card className='card-user'>
              <Container fluid>
                <Card.Body>{MyComponent()}</Card.Body>
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
