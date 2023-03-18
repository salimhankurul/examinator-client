import React from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import NotificationAlert from 'react-notification-alert'

import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import routes from '../routes'

// @ts-ignore
import sidebarImage from '../assets/img/sidebar-3.jpg'

import { useAuth } from '../global'

function main() {
  const { accessToken, profile: globalProfile, setProfile } = useAuth() as any

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

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <div className="wrapper">
        <Sidebar color={color} image={image} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            Exams
            <Card className="card-user">
              <Container fluid>
                <Card.Body></Card.Body>
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
