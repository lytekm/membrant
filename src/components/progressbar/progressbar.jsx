import { React, useEffect, useState } from "react";
import config from "../../config.js";

const Progressbar = (props) => {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  function getProgress(listid) {
    fetch(`${config.apiBaseUrl}/tasks/count/` + listid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCompleted((completed) => (completed += data.completed));
        setTotal((total) => (total += data.total));
      });
  }

  useEffect(() => {
    //get all lists in the project
    fetch(`${config.apiBaseUrl}/projects/lists/` + props.projectId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          getProgress(data[i].list_id);
        }
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
