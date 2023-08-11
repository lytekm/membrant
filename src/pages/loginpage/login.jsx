import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(md5(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("https://membrant-server.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          navigate("/dashboard/" + username);
        } else {
          setErrorMessage("Username or Password is incorrect");
        }
      });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage === "" ? null : (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default Login;
