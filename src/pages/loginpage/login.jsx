import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const encrypt = (password) => {
  let encrypted = "";
  for (let i = 0; i < password.length; i++) {
    encrypted += String.fromCharCode(password.charCodeAt(i) + password.length);
  }
  return encrypted;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const encryptedPassword = encrypt(e.target.value);
    setPassword(encryptedPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn === "true") {
          navigate("/dashboard/" + username);
        } else {
          alert("Wrong username or password");
        }
      });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
