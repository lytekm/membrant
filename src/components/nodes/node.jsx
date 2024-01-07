import { React, useState, useEffect } from "react";

const Node = (props) => {
  const [complete, setComplete] = useState("");
  const [percentage, setPercentage] = useState(0);

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

  useEffect(() => {
    if (props.project_id) {
      fetch("http://localhost:5000/projects/completion/" + props.project_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPercentage(data[0].completion_percentage);
        });
    }
  });

  return (
    <div
      className={props.class + complete}
      onClick={
        props.onClick
          ? props.onClick
          : () => {
              deleteTask(props.dailytask_id);
            }
      }
    >
      <p className="node-text">
        {props.text} {props.project_id ? `(${percentage}%)` : ""}
      </p>
    </div>
  );
};

export default Node;
