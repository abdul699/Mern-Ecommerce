import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {

    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }

    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mt-3 mb-3">
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="form-group mt-3 mb-3">
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
                placeholder="Password"
              />
            </div>
            <button onClick={onSubmit} className="btn rounded btn-success btn-block form-control mt-4">
                Submit
              </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Log In" description="">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
