import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import LoginApi from "../../API/LoginApi";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const router = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = () => {
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    LoginApi(setloading, setError, data, router);
  };

  return (
    <div className="login">
      <div className="login_container">
        <img src={logo} alt="" width={"150px"} height={"120px"} />
        <div className="login_form">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error_message">{error}</p>}
          <button onClick={auth}>
            {loading ? "Loading..." : "Login"}
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
