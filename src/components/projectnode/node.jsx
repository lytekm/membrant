import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectNode = (props) => {
  const Navigate = useNavigate();

  const onClick = () => {
    Navigate("/" + props.user + "/projects/" + props.projectID);
  };

  return (
    <div className="project-link" onClick={onClick}>
      <h3>{props.projectName}</h3>
    </div>
  );
};

export default ProjectNode;
