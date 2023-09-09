import React from "react";
import MainPage from "./pages/mainpage/main";
import Signup from "./pages/signuppage/signup";
import Login from "./pages/loginpage/login";
import Dashboard from "./pages/dashboard/dash";
import Projects from "./pages/projects/projects";
import Project from "./pages/project/project";
import DayPlanner from "./pages/dayplanner/dayplanner";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./pages/mainpage/main.css";
import "./components/navbar/nav.css";
import "./components/header/head.css";
import "./pages/signuppage/signup.css";
import "./pages/dashboard/dash.css";
import "./pages/projects/projects.css";
import "./pages/project/project.css";
import "./components/projectsettings/settings.css";
import "./components/list/list.css";
import "./components/nodes/node.css";
import "./components/nodes/input-node.css";
import "./components/progressbar/progressbar.css";
import "./pages/dayplanner/dayplanner.css";
import "./components/addplanneritem/addplanneritem.css";
import "./components/times/times.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="/projects/:id/:projectId" element={<Project />} />
        <Route path="/dayplanner/:id" element={<DayPlanner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
