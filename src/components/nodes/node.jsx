import { React, useState } from "react";

const Node = (props) => {
  const [complete, setComplete] = useState("");

  const completeTask = () => {
    setComplete("complete");
  };
  return (
    <div className={props.class + " " + complete} onClick={props.onClick}>
      {props.button ? (
        <button className="node-button" onClick={completeTask}>
          {props.text}
        </button>
      ) : (
        <p className="node-text">{props.text}</p>
      )}
    </div>
  );
};

export default Node;
