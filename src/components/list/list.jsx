import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputNode from "../nodes/input-node";
import config from "../../config.js";
import Arrow from "./arrow.svg";
import Garbage from "./garbage.svg";

const List = (props) => {
  const [Nodes, setNodes] = useState([]);
  const [listName, setListName] = useState("");
  const [showList, setShowList] = useState(true);
  const params = useParams();

  useEffect(() => {
    setListName(props.listName);
    fetch(`${config.apiBaseUrl}/lists/tasks/` + props.listID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].completed === 1) {
            continue;
          } else {
            setNodes((Nodes) => [...Nodes, data[i].task_id]);
          }
        }
      });
  }, []);

  const addNode = () => {
    const nodeId = Math.floor(Math.random() * 1000);
    setNodes([...Nodes, nodeId]);

    fetch(`${config.apiBaseUrl}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskid: nodeId,
        taskname: "New Task",
        listid: props.listID,
        username: params.id,
      }),
    }).then((res) => res.json());
  };

  const deleteNode = (id) => {
    const newNodes = Nodes.filter((node) => {
      return node !== id;
    });
    setNodes(newNodes);
    fetch(`${config.apiBaseUrl}/tasks/` + id + "/" + props.listID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const changeListName = (e) => {
    setListName(e.target.value);
  };

  const updateListName = () => {
    console.log(listName);
    console.log(props.listID);
    fetch(`${config.apiBaseUrl}/lists/` + props.listID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listname: listName,
      }),
    }).then((res) => res.json());
  };

  return (
    <div className="list">
      <div className="list-header-container">
        <img
          className="delete-list"
          src={Garbage}
          onClick={props.deleteList}
          alt="list dots"
        />
        <input
          className="list-header"
          value={listName}
          onChange={(e) => {
            changeListName(e);
          }}
          onBlur={updateListName}
        />
        <img
          className="dropdown"
          src={Arrow}
          alt="arrow"
          style={showList ? { rotate: "0deg" } : { rotate: "180deg" }}
          onClick={() => {
            setShowList(!showList);
          }}
        />
      </div>
      <div
        className="node-container"
        style={{
          display: showList ? "flex" : "none",
        }}
      >
        {Nodes.map((node) => {
          return (
            <InputNode
              className={"list-node"}
              key={node}
              onClick={() => deleteNode(node)}
              id={node}
              listID={props.listID}
            />
          );
        })}
        <button className="add-node" onClick={addNode}>
          +
        </button>
      </div>
    </div>
  );
};

export default List;
