import { React, useState, useEffect } from "react";
import config from "../../config.js";

const InputNode = (props) => {
  const [text, setText] = useState("");
  const [complete, setComplete] = useState("");

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/tasks/` + props.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setText(data[0].taskname);
      });
  }, []);

  const nodeOnChange = (e) => {
    setText(e.target.value);
  };

  const saveNode = () => {
    fetch(`${config.apiBaseUrl}/tasks/` + props.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasktext: text,
      }),
    });
  };

  const completeTask = (id) => {
    fetch(`${config.apiBaseUrl}/tasks/complete/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setComplete(" complete");
  };

  return (
    <div className={"input-node" + complete}>
      <span
        className="input-node-input"
        type="text"
        onChange={(e) => nodeOnChange(e)}
        onBlur={saveNode}
        contentEditable="true"
      >
        {text}
      </span>
      <button className="input-node-button" onClick={props.onClick}>
        Delete
      </button>
      <input type="checkbox" onChange={() => completeTask(props.id)} />{" "}
    </div>
  );
};

export default InputNode;
