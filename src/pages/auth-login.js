import React, { useState, useRef } from "react";
import NotificationAlert from "react-notification-alert";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/login.css";

import { useAuth } from "../global";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const notificationAlertRef = React.useRef(null);

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

  const handleLogin = async (e) => {
    setLoading(true);
    notify({ message: 'Logging in...' })
    await login(email, password);
    setLoading(false);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const pass = e.target.value;
    setPassword(pass);
  };


  return (
    <>
    <NotificationAlert ref={notificationAlertRef} />
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              alt="hey"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <>
              <form className="login-form">
                <div className="d-flex align-items-center my-4">
                  <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={onChangeEmail}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={onChangePassword}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">         
                  <Link to="/reset-password" className="text-body">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={handleLogin}
                  >
                    { loading ? 'Please Wait...' : 'Login' }
                  </Button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default LoginPage;
