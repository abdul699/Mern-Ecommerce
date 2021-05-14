import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";


const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
}) => {

  const goContactPage = () => (
    <div className="mt-5">
        <Link className="btn rounded btn-warning  btn-lg" to="/contact">Contact Us</Link>
    </div>
)


  return (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
        <div className={className}>{children}</div>
      </div>
    </div>
    <footer className="footer mt-auto">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        {goContactPage()}
      </div>
      {/* <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div> */}
    </footer>
  </div>
  )
};

export default Base;
