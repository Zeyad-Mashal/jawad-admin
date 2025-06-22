import React from "react";
import "./login.css";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login">
      <div className="login_container">
        <img src={logo} alt="" width={"150px"} height={"120px"} />
        <div className="login_form">
          <h1>Login</h1>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Link to={"/stable"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
