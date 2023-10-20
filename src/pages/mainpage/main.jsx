import { useNavigate } from "react-router-dom";
import React from "react";
import Features from "../../components/features/features";
import projectImage from "./images/projects.png";
import dailyTaskImage from "./images/daily tasks.png";
import dayPlannerImage from "./images/daily planner.png";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mainpage">
      <div className="head">
        <p>
          "For every minute spent <br />
          organizing, and hour is earned"-
          <br />
          Anonymous.
        </p>
        <h1>Membrant</h1>
        <button onClick={() => navigate("/signup")}>Get Started</button>
      </div>
      <div className="body">
        <h2>Features</h2>
        <div className="features-container">
          <Features
            title={"Daily Tasks"}
            text="Keep track of your daily tasks"
            img={dailyTaskImage}
          />
          <Features
            title={"Projects"}
            text="Organize your projects"
            img={projectImage}
          />
          <Features
            title={"Day Planner"}
            text="Plan your day"
            img={dayPlannerImage}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
