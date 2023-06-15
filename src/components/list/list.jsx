import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputNode from "../nodes/input-node";

const List = (props) => {
  const [Nodes, setNodes] = useState([]);
  const [listName, setListName] = useState("");

  const params = useParams();

  useEffect(() => {
    setListName(props.listName);
    fetch("http://localhost:5000/nodes/get/" + props.listID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const nodes = data.data;
        setNodes(nodes);
      });
  }, []);

  const addNode = () => {
    const nodeId = Math.floor(Math.random() * 1000);
    setNodes([...Nodes, { task_id: nodeId }]);

    fetch("http://localhost:5000/tasks/" + props.listID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: nodeId,
        tasktext: "New Task",
        list_id: props.listID,
        user: params.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const deleteNode = (id) => {
    const newNodes = Nodes.filter((node) => {
      return node.task_id != id;
    });
    setNodes(newNodes);
    fetch("http://localhost:5000/tasks/delete/" + id, {
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
    fetch("http://localhost:5000/lists/update/" + props.listID, {
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
          updateListName();
        }}
      />
      <div className="node-container">
        {Nodes.map((node) => {
          return (
            <InputNode
              className={"list-node"}
              key={node.task_id}
              onClick={() => deleteNode(node.task_id)}
              id={node.task_id}
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
