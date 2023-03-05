import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const List = (props) => {
  const [listName, setListName] = useState("New List");
  const [listNodes, setListNodes] = useState([]);
  const [completedNodes, setCompletedNodes] = useState([]);
  const [nodeText, setNodeText] = useState({});
  const params = useParams();

  useEffect(() => {
    if (props.loaded) {
      setListName(props.listName);
      setCompletedNodes(props.completedNodes);
      for (let i in props.nodes) {
        setListNodes((prev) => [...prev, i]);
        setNodeText((prev) => {
          return {
            ...prev,
            [i]: props.nodes[i],
          };
        });
      }
      console.log(nodeText);
    }
  }, []);

  const saveList = () => {
    const list = {
      user: params.id,
      ID: props.ID,
      projectID: params.projectID,
      name: listName,
      nodes: nodeText,
      completedNodes: completedNodes,
    };
    fetch(`http://localhost:5000/api/projects/savelist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
  };

  const deleteSavedNode = (key) => {
    const list = {
      projectID: params.projectID,
      listID: props.ID,
      nodeID: key,
    };
    fetch(`http://localhost:5000/api/projects/deletenode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
  };

  const addListNode = () => {
    const key = Math.floor(Math.random() * 1000);
    setListNodes((prev) => [...prev, key]);
    console.log("added node: ", key);
    saveList();
  };

  const nodeOnChange = (e, key) => {
    nodeText[key] = e.target.value;
    console.log(nodeText);
    saveList();
  };

  const deleteListNode = (key) => {
    setListNodes((prev) => prev.filter((node) => node !== key));
    setNodeText((prev) => {
      delete prev[key];
      return prev;
    });
    console.log(listNodes);
    deleteSavedNode(key);
    saveList();
  };

  const completeListNode = (key) => {
    setCompletedNodes((prev) => [...prev, nodeText[key]]);
    deleteListNode(key);
  };

  return (
    <div className="list">
      <input
        className="list-title"
        type="text"
        value={listName}
        onChange={(e) => {
          setListName(e.target.value);
          saveList();
        }}
      />
      <div className="list-nodes">
        {listNodes.map((node) => (
          <ListNode
            key={node}
            deleteNode={() => deleteListNode(node)}
            completeNode={() => completeListNode(node)}
            onChange={(e) => nodeOnChange(e, node)}
            value={nodeText[node]}
          />
        ))}
      </div>
      <button className="add-node-button" onClick={addListNode}>
        Add Node
      </button>
      <div className="completed-nodes">
        {completedNodes.map((node) => (
          <div className="completed-node" key={node.length}>
            {node}
          </div>
        ))}
      </div>
    </div>
  );
};

const ListNode = (props) => {
  return (
    <div className="list-node">
      <input type="text" onChange={props.onChange} value={props.value} />
      <button className="list-node-button" onClick={props.completeNode}>
        Complete
      </button>
      <button className="list-node-button" onClick={props.deleteNode}>
        Delete
      </button>
    </div>
  );
};

export default List;
