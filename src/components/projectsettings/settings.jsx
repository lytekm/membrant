import React from "react";

const Settings = (props) => {
  return (
    <div className="settings">
      <label htmlFor="change-name">Change Name</label>
      <input
        type="text"
        className="change-project-name"
        name="change-name"
        placeholder={props.projectName}
        onChange={props.onChange}
      />
      <label htmlFor="add-people">Add Collaborators</label>
      <input
        type="text"
        name="add-people"
        className="add-people"
        placeholder="username"
      />
      <button className="delete-project" onClick={props.deleteProject}>
        Delete Project
      </button>
    </div>
  );
};

export default Settings;
