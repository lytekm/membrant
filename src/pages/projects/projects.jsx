import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Node from "../../components/nodes/node";
import Navbar from "../../components/navbar/nav";
import AddLogo from "../../pages/projects/plussign.svg";
import config from "../../config.js";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/projects/` + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(...projects, data);
        console.log(data);
      });
  }, []);

  //get the completion of each project
  useEffect(() => {
    projects.map((project) => {
      fetch(`${config.apiBaseUrl}/projects/complete/` + project.project_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
  });

  //send the new project to the database
  const createProject = () => {
    const project = {
      projectname: "New Project",
      username: params.id,
      project_id: Math.floor(Math.random() * 10000) + 1,
    };
    fetch(`${config.apiBaseUrl}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    console.log(project);
    return project;
  };

  return (
    <Fragment>
      <Navbar />
      <h1 className="projects-header">Projects</h1>
      <button
        className="create-project"
        onClick={() => {
          navigate("/projects/" + params.id + "/" + createProject().project_id);
        }}
      >
        Create Project
        <img src={AddLogo} alt="Add Logo" />
      </button>
      <div className="projects-container">
        <div className="myprojects">
          <h3>My Projects</h3>
          <div className="project-list">
            {projects.map((project) => {
              return (
                <Node
                  class={"project"}
                  text={project.projectname}
                  key={project.project_id}
                  onClick={() => {
                    navigate(
                      "/projects/" + params.id + "/" + project.project_id
                    );
                  }}
                  project_id={project.project_id}
                />
              );
            })}
          </div>
        </div>
        <div className="allprojects">
          <h3>All Projects</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default Projects;
