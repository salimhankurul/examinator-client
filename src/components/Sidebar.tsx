import React, { Component } from 'react'
import { useLocation, NavLink } from 'react-router-dom'

import { Badge, Nav } from 'react-bootstrap'

function Sidebar({ color, image, routes }: { color: string; image: string; routes: any[] }) {
  const location = useLocation()
  const activeRoute = (routeName: string) => {
    return location.pathname === routeName ? 'active' : ''
  }

  function getStudentRoutes() {
    return routes.filter((route) => route.accessLevel === 'student')
  }

  function getTeacherRoutes() {
    return routes.filter((route) => route.accessLevel === 'teacher')
  }

  function renderRoutes(targetRoutes: any[]) {
    return (
      <>
        {targetRoutes.map((prop, key) => {
          if (!prop.redirect)
            return (
              <>
                <li className={activeRoute(prop.path)} key={key}>
                  <NavLink to={prop.path} className='nav-link'>
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              </>
            )
          return null
        })}
      </>
    )
  }

  function render() {
    const studentRoutes = getStudentRoutes()
    const teacherRoutes = getTeacherRoutes()

    return (
      <>
        {renderRoutes(studentRoutes)}
        {
          <li>
            <div className='nav-link'>
              <Badge className='d-flex justify-content-center bg-primary text-wrap' style={{ fontSize: '15px' }}>
                Teacher Pages
              </Badge>
            </div>
          </li>
        }
        {renderRoutes(teacherRoutes)}
      </>
    )
  }



  return (
    <div className='sidebar' data-image={image} data-color={color}>
      <div
        className='sidebar-background'
        style={{
          backgroundImage: 'url(' + image + ')',
        }}
      />
      <div className='sidebar-wrapper'>
        <div className='logo d-flex align-items-center justify-content-start'>
          <a href='https://www.creative-tim.com?ref=lbd-sidebar' className='simple-text logo-mini mx-1'>
            <div className='logo-img'>
              <img src={require('../assets/img/reactlogo.png')} alt='...' />
            </div>
          </a>
          <a className='simple-text' href=''>
            Examinator
          </a>
        </div>
        <Nav>
          {render()}
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar
