import { React, useEffect, useState } from "react";

const Progressbar = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(props.lists);
    for (let list in props.lists) {
      fetch("http://localhost:5000/tasks/count/" + props.lists[list].list_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //add the number of tasks in the list to the progress
          setProgress(progress + data.data.count);
        });
    }
  }, []);

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
};

export default Progressbar;
