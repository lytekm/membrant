import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/nav";
import Settings from "../../components/projectsettings/settings";
import List from "../../components/list/list";
import Progressbar from "../../components/progressbar/progressbar";
import config from "../../config.js";
import Arrow from "../../components/list/arrow.svg";

const Project = (props) => {
  const params = useParams();
  const [projectName, setProjectName] = useState("");
  const [openSettings, setOpenSettings] = useState(false);
  const [openCompleted, setOpenCompleted] = useState(false);
  const [completedItems, setCompletedItems] = useState([]);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();
  const projectID = params.projectId;
  const user = params.id;

  function fetchProject() {
    fetch(`${config.apiBaseUrl}/projects/` + user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const projects = data;
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].project_id == projectID) {
            setProjectName(projects[i].projectname);
          }
        }
      });
  }

  function fetchLists() {
    fetch(`${config.apiBaseUrl}/projects/lists/` + projectID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLists(data);
      });
  }

  function fetchCompltedItems() {
    fetch(`${config.apiBaseUrl}/projects/complete/` + projectID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompletedItems(data);
      });
  }

  function saveList(list) {
    fetch(`${config.apiBaseUrl}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    }).then((res) => res.json());
  }

  useEffect(() => {
    fetchProject();
    fetchLists();
    fetchCompltedItems();
  }, []);

  const titleOnChange = (e) => {
    setProjectName(e.target.value);
  };

  const deleteProject = () => {
    fetch(`${config.apiBaseUrl}/projects/` + projectID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    navigate("/projects/" + params.id);
  };

  const addList = () => {
    const list = {
      listname: "New List",
      project_id: params.projectId,
      list_id: Math.floor(Math.random() * 10000) + 1,
      username: params.id,
    };
    //save the list to the database
    saveList(list);
    setLists([...lists, list]);
  };

  const deleteList = (listID) => {
    fetch(`${config.apiBaseUrl}/lists/` + listID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setLists(lists.filter((list) => list.list_id !== listID));
  };

  return (
    <div>
      <Navbar />
      <h1 className="project-header">
        {projectName}
        <button
          className="project-settings"
          onClick={() => {
            if (openSettings) {
              fetch(`${config.apiBaseUrl}/projects/` + projectID, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ projectname: projectName }),
              }).then((res) => res.json());
            }
            setOpenSettings(!openSettings);
          }}
        >
          Project Settings
        </button>
      </h1>
      {openSettings ? (
        <div className="settings-container">
          <Settings
            projectName={projectName}
            onChange={titleOnChange}
            deleteProject={deleteProject}
          />
        </div>
      ) : null}
      <div className="project-container">
        <button className="add-list" onClick={addList}>
          Add List
        </button>
        <Progressbar projectId={projectID} />
        <div className="list-container">
          {lists.map((list) => {
            return (
              <List
                listName={list.listname}
                key={list.list_id}
                listID={list.list_id}
                deleteList={() => {
                  deleteList(list.list_id);
                }}
              />
            );
          })}
        </div>
        <div className="completed-items">
          <h2>Completed Items</h2>
          <img
            src={Arrow}
            alt="arrow"
            onClick={() => setOpenCompleted(!openCompleted)}
            style={{
              transform: openCompleted ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </div>
        <div
          className="completed-items-container"
          style={{ display: openCompleted ? "block" : "none" }}
        >
          <h3>{completedItems.length} Items</h3>
          {completedItems.map((item) => {
            return <p key={completedItems.indexOf(item)}>{item.taskname}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
