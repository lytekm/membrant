import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import md5 from "md5";
import config from "../../config.js";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(md5(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.apiBaseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => {
        res.json();
        if (res.status === 200) {
          navigate("/login");
        } else {
          setErrorMessage("Username or Email already exists");
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div className="login-page">
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage === "" ? null : (
        <div className="error-message">{errorMessage}</div>
      )}
      <p>
        Already a user? <Link to={"/login"}>Login Here</Link>
      </p>
    </div>
  );
};

export default Signup;
