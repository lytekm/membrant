import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import md5 from "md5";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    setPassword(md5(password));
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    navigate("/login");
  };

  return (
    <div className="login-page">
      <h1>Sign Up</h1>
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
