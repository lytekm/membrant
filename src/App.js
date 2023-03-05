import React from "react";
import MainPage from "./pages/mainpage/main";
import Signup from "./pages/signuppage/signup";
import Login from "./pages/loginpage/login";
import Dashboard from "./pages/dashboard/dash";
import ProjectPage from "./pages/projectpage/project";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./pages/mainpage/main.css";
import "./components/navbar/nav.css";
import "./components/header/head.css";
import "./pages/signuppage/signup.css";
import "./pages/dashboard/dash.css";
import "./components/projectnode/node.css";
import "./pages/projectpage/project.css";
import "./components/list/list.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/:id/projects/:projectID" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
