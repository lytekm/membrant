import { React, useState, useEffect } from "react";

const InputNode = (props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tasks/get/" + props.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setText(data.data[0].taskname);
      });
  }, []);

  const nodeOnChange = (e) => {
    setText(e.target.value);
    fetch("http://localhost:5000/tasks/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasktext: text,
        task_id: props.id,
      }),
    });
  };

  return (
    <div className="input-node">
      <input
        className="input-node-input"
        type="text"
        onChange={(e) => nodeOnChange(e)}
        value={text}
      />
      <button className="input-node-button" onClick={props.onClick}>
        Delete
      </button>
    </div>
  );
};

export default InputNode;
