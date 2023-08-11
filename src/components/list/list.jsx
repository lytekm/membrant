import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputNode from "../nodes/input-node";

const List = (props) => {
  const [Nodes, setNodes] = useState([]);
  const [listName, setListName] = useState("");

  const params = useParams();

  useEffect(() => {
    setListName(props.listName);
    fetch("https://membrant-server.onrender.com/lists/tasks/" + props.listID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].task_id);
          setNodes((Nodes) => [...Nodes, data[i].task_id]);
        }
      });
  }, []);

  const addNode = () => {
    const nodeId = Math.floor(Math.random() * 1000);
    setNodes([...Nodes, nodeId]);

    fetch("https://membrant-server.onrender.com/tasks/", {
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const deleteNode = (id) => {
    const newNodes = Nodes.filter((node) => {
      return node !== id;
    });
    setNodes(newNodes);
    fetch(
      "https://membrant-server.onrender.com/tasks/" + id + "/" + props.listID,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const changeListName = (e) => {
    setListName(e.target.value);
  };

  const updateListName = () => {
    console.log(listName);
    console.log(props.listID);
    fetch("https://membrant-server.onrender.com/lists/" + props.listID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listname: listName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="list">
      <input
        className="list-header"
        value={listName}
        onChange={(e) => {
          changeListName(e);
        }}
        onBlur={updateListName}
      />
      <div className="node-container">
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
