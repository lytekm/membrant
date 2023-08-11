import { React, useEffect, useState } from "react";

const Progressbar = (props) => {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  function getProgress(listid) {
    fetch("https://membrant-server.onrender.com/tasks/count/" + listid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCompleted(completed + data.completed);
        setTotal(total + data.total);
      });
  }

  useEffect(() => {
    //get all lists in the project
    fetch(
      "https://membrant-server.onrender.com/projects/lists/" + props.projectId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map((list) => {
          getProgress(list.list_id);
        });
      });
  }, []);

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: (completed / total) * 100 + "%" }}
      ></div>
    </div>
  );
};

export default Progressbar;
