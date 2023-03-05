import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/nav";
import ProjectNode from "../../components/projectnode/node";

const Dashboard = (props) => {
  const [projects, setProjects] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:5000/api/projects/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: params.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.map((project) => {
          setProjects((prev) => [...prev, project]);
        });
      });
  }, []);

  const addProjects = () => {
    const projectID = Math.floor(Math.random() * 1000);
    const project = {
      title: "New Project",
      projectID: projectID,
      user: params.id,
    };
    setProjects((prev) => [...prev, project]);
    console.log(projects);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        <h2>Welcome {params.id}</h2>
        <div className="projects">
          <h3>Projects</h3>
          <div className="project-list">
            {projects.length > 0 ? (
              projects.map((key) => {
                console.log(key);
                return (
                  <ProjectNode
                    key={key.projectID}
                    projectID={key.projectID}
                    user={params.id}
                    projectName={key.title}
                  />
                );
              })
            ) : (
              <h4>Theres Nothing to show here</h4>
            )}
          </div>
          <div className="button-wrapper">
            {projects.length > 0 ? (
              <button className="add-project" onClick={addProjects}>
                Add Project
              </button>
            ) : (
              <button className="add-project" onClick={addProjects}>
                Add Something
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
