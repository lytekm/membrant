import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/nav";
import MenuLogo from "../../components/svgs/menulogo";
import List from "../../components/list/list";

const ProjectPage = (props) => {
  const params = useParams();
  const projectName = useRef("New Project");
  const inputRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [lists, setLists] = useState([]);
  const [savedLists, setSavedLists] = useState([]);

  useEffect(() => {
    // focus on input field
    inputRef.current.focus();

    //load in project data

    fetch("http://localhost:5000/api/projects/getdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: params.id,
        projectID: params.projectID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        projectName.current = data.title;
        inputRef.current.value = data.title;
        data.list.map((list) => {
          setSavedLists((prev) => [...prev, list]);
        });
      });
  }, []);

  const onMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  const saveProject = () => {
    fetch("http://localhost:5000/api/projects/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: projectName.current,
        user: params.id,
        projectID: params.projectID,
      }),
    });
  };

  const addList = () => {
    const listID = Math.floor(Math.random() * 1000);
    setLists((prev) => [...prev, listID]);
    setOpenMenu(false);
  };

  const onTitleChange = (e) => {
    projectName.current = e.target.value;
    console.log(projectName);
  };

  const MenuDropdown = () => {
    const showMenu = openMenu ? "show" : "hide";
    return (
      <div className={"dropdown" + showMenu}>
        <button className="dropdown-button" onClick={addList}>
          Add List
        </button>
        <button className="dropdown-button" onClick={saveProject}>
          Save
        </button>
        <button className="dropdown-button">Delete</button>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="project-header">
        <input type="text" onChange={onTitleChange} ref={inputRef} />
        <button className="menu-button" onClick={onMenuClick}>
          <MenuLogo className={openMenu ? "active" : ""} />
        </button>
        <MenuDropdown />
      </div>
      <div className="project-body">
        {lists.map((list) => {
          return <List key={list} ID={list} />;
        })}
        {savedLists.map((list) => {
          console.log(list);
          return (
            <List
              key={list.id}
              ID={list.id}
              listName={list.name}
              nodes={list.nodes}
              completedNodes={list.completedNodes}
              loaded={true}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ProjectPage;
