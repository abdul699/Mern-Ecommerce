import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <form>
            <div className="form-group mt-3 mb-3">
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
                placeholder="Name"
              />
            </div>
            <div className="form-group mt-3 mb-3">
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
                placeholder="Email"
              />
            </div>

            <div className="form-group mt-3 mb-3">
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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

  return (
    <Base title="Join T-Shirt Store" description="">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
