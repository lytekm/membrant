import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/nav";
import Node from "../../components/nodes/node";
import config from "../../config.js";

const Dashboard = () => {
  const params = useParams();
  const [tasks, setTasks] = useState([]);
  //const [lateTasks, setLateTasks] = useState("");
  const [recentProjects, setRecentProjects] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/dailytasks/` + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(...tasks, data);
        console.log(data);
      });
  }, []);
  // get the recent projects
  useEffect(() => {
    fetch(`${config.apiBaseUrl}/projects/recent/` + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecentProjects(data);
      });
  }, []);

  const saveTasks = (text, user, id) => {
    const task = {
      tasktext: text,
      user: user,
      dailytask_id: id,
    };
    console.log(task);
    fetch(`${config.apiBaseUrl}/dailytasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const addTask = () => {
    const task = {
      dailytask_id: Math.floor(Math.random() * 100),
      tasktext: text,
      user: params.id,
    };

    console.log(task);

    if (text !== "") {
      setTasks([...tasks, task]);
      setText("");
      document.querySelector("input").value = "";
      saveTasks(task.tasktext, task.user, task.dailytask_id);
    } else {
      alert("Please enter a task");
    }
  };

  return (
    <Fragment>
      <Navbar />
      <h1 className="dash-header">Dashboard</h1>
      <h2 className="dash-header">Welcome {params.id}</h2>
      <div className="dashboard">
        <div className="projects">
          <h3>Recent Projects</h3>
          <div className="projects-list">
            {recentProjects.length === 0 ? (
              <p>No recent projects</p>
            ) : (
              recentProjects.map((project) => (
                <Node
                  class="project"
                  onClick={() => {
                    navigate(
                      "/projects/" + params.id + "/" + project.project_id
                    );
                  }}
                  key={project.project_id}
                  text={project.projectname}
                />
              ))
            )}
          </div>
        </div>
        <div className="daily-tasks">
          <h3>Daily Tasks</h3>
          <div className="tasks">
            <input
              type="text"
              placeholder="Add Task"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button className="add-task" onClick={addTask}>
              Add Task
            </button>
            {tasks.map((task) => (
              <Node
                class={"task"}
                key={task.dailytask_id}
                text={task.tasktext}
                button={true}
                id={task.dailytask_id}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
