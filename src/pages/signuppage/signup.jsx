import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const encrypt = (password) => {
  let encrypted = "";
  for (let i = 0; i < password.length; i++) {
    encrypted += String.fromCharCode(password.charCodeAt(i) + password.length);
  }
  return encrypted;
};

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const data = { username, email, password };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const encryptedPassword = encrypt(e.target.value);
    setPassword(encryptedPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/newlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setUsername("");
    setEmail("");
    setPassword("");

    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    navigate("/login");
  };

  return (
    <div className="login-page">
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already a user? <Link to={"/login"}>Login Here</Link>
      </p>
    </div>
  );
};

export default Signup;
