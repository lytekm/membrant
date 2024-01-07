import { React, useEffect, useState } from "react";
import config from "../../config.js";

const Progressbar = (props) => {
  const [completed, setCompleted] = useState(0);

  function getProgress(projectid) {
    fetch(`${config.apiBaseUrl}/projects/completion/` + projectid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCompleted(data[0].completion_percentage);
      });
  }

  useEffect(() => {
    getProgress(props.projectId);
  }, []);

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: completed + "%" }}
      ></div>
    </div>
  );
};

export default Progressbar;
