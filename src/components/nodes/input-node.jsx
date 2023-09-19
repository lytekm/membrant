import { React, useState, useEffect, useRef } from "react";
import config from "../../config.js";

const InputNode = (props) => {
  const [text, setText] = useState("");
  const [complete, setComplete] = useState("");
  const inputRef = useRef(null);

  const changeHeight = () => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      input.style.height = `${input.scrollHeight}px`;
    }
  };

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

  useEffect(() => {
    changeHeight();
  }, [text]);

  const nodeOnChange = (e) => {
    setText(e.target.value);
    changeHeight();
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
      <textarea
        ref={inputRef}
        className="input-node-input"
        type="text"
        onChange={(e) => nodeOnChange(e)}
        onBlur={saveNode}
        value={text}
        rows={1}
      />
      <button className="input-node-button" onClick={props.onClick}>
        Delete
      </button>
      <input type="checkbox" onChange={() => completeTask(props.id)} />{" "}
    </div>
  );
};

export default InputNode;
