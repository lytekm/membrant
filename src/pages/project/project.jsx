import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/nav";
import Settings from "../../components/projectsettings/settings";
import List from "../../components/list/list";
import Progressbar from "../../components/progressbar/progressbar";

const Project = (props) => {
  //hooks
  const params = useParams();
  const [projectName, setProjectName] = useState("");
  const [openSettings, setOpenSettings] = useState(false);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();
  //get user and project id from url
  const projectID = params.projectId;
  const user = params.id;

  //get the project name
  function fetchProject() {
    fetch("https://membrant-server.onrender.com/projects/" + user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const projects = data;
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].project_id === projectID) {
            setProjectName(projects[i].projectname);
          }
        }
      });
  }

  //get the project lists
  function fetchLists() {
    fetch("https://membrant-server.onrender.com/projects/lists/" + projectID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const lists = data;
        setLists(lists);
      });
    console.log(lists);
  }

  //save the list to the database
  function saveList(list) {
    fetch("https://membrant-server.onrender.com/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  useEffect(() => {
    fetchProject();
    fetchLists();
  }, []);

  const titleOnChange = (e) => {
    setProjectName(e.target.value);
  };

  //delete the project
  const deleteProject = () => {
    fetch("https://membrant-server.onrender.com/projects/" + projectID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    navigate("/projects/" + params.id);
  };

  //add a new list
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

  return (
    <div>
      <Navbar />
      <h1 className="project-header">
        {projectName}
        <button
          className="project-settings"
          onClick={() => {
            if (openSettings) {
              fetch(
                "https://membrant-server.onrender.com/projects/" + projectID,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ projectname: projectName }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                });
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
