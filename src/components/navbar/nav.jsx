import React from "react";
import { Link, useParams } from "react-router-dom";
import DashLogo from "../../components/navbar/Dashboard.svg";
import ProjectLogo from "../../components/navbar/project-logo.svg";
import DayPlannerLogo from "./dayplanner.svg";

const Navbar = (props) => {
  const params = useParams();
  return (
    <div className="navbar">
      <NavItem
        to={"/dashboard/" + params.id}
        logo={DashLogo}
        text={"Dashboard"}
      />

      <NavItem
        to={"/projects/" + params.id}
        logo={ProjectLogo}
        text={"Projects"}
      />

      <NavItem
        to={"/dayplanner/" + params.id}
        text={"Day Planner"}
        logo={DayPlannerLogo}
      />
    </div>
  );
};

const NavItem = (props) => {
  return (
    <div className="nav-item">
      <Link className="nav-item-link" to={props.to}>
        <img src={props.logo} alt="logo" className="logo" />
        <p className="nav-item-text">{props.text}</p>
      </Link>
    </div>
  );
};

export default Navbar;
