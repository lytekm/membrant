import { React, useState } from "react";

const Node = (props) => {
  const [complete, setComplete] = useState("");

  const deleteTask = (id) => {
    fetch("http://localhost:5000/dailytasks/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setComplete(" complete");
  };
  return (
    <div
      className={props.class + complete}
      onClick={
        props.onClick
          ? props.onClick
          : () => {
              deleteTask(props.id);
            }
      }
    >
      <p className="node-text">{props.text}</p>
    </div>
  );
};

export default Node;
