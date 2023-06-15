import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/nav";
import Node from "../../components/nodes/node";

const Dashboard = (props) => {
  const params = useParams();
  const [tasks, setTasks] = useState([]);
  const [lateTasks, setLateTasks] = useState("");
  const [recentProjects, setRecentProjects] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/dailytasks/" + params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        for (let task in data) {
          setTasks(...tasks, data[task]);
        }
        console.log(data);
      });
  }, []);

  const saveTasks = (text, user, date, id) => {
    const task = {
      tasktext: text,
      user: user,
      date: date,
      dailytask_id: id,
    };
    console.log(task);
    fetch("http://localhost:5000/dailytasks", {
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

  const deleteTask = (id) => {
    fetch("http://localhost:5000/dailytasks/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const addTask = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    const date = `${day}/${month}/${year}`;

    const task = {
      dailytask_id: Math.floor(Math.random() * 100),
      tasktext: text,
      date: date,
      user: params.id,
    };

    console.log(task);

    if (text !== "") {
      setTasks([...tasks, task]);
      setText("");
      document.querySelector("input").value = "";
      saveTasks(task.tasktext, task.user, task.date, task.dailytask_id);
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
                <Node class="project" key={project.id} text={project.name} />
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
                onClick={() => deleteTask(task.dailytask_id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
