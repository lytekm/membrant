import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/nav";
import Settings from "../../components/projectsettings/settings";
import List from "../../components/list/list";
import Progressbar from "../../components/progressbar/progressbar";

const Project = (props) => {
  const params = useParams();
  const [projectName, setProjectName] = useState("");
  const [openSettings, setOpenSettings] = useState(false);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/projects/get/" + params.projectId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const project = data.data[0];
        setProjectName(project.projectname);
      });

    fetch("http://localhost:5000/lists/" + params.projectId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const lists = data.data;
        setLists(lists);
      });
  }, []);

  const titleOnChange = (e) => {
    setProjectName(e.target.value);
    console.log(projectName);
  };

  const deleteProject = () => {
    fetch("http://localhost:5000/projects/delete/" + params.projectId, {
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

  const addList = () => {
    const list = {
      listname: "New List",
      project_id: params.projectId,
      list_id: Math.floor(Math.random() * 10000) + 1,
      username: params.id,
    };
    fetch("http://localhost:5000/lists/" + params.projectId, {
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
                "http://localhost:5000/projects/update/" + params.projectId,
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
        <Progressbar lists={lists} />
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
