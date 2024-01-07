import { React, useState } from "react";

export default function Features(props) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <div
      className={clicked ? "features" : "features-clicked"}
      onClick={handleClick}
    >
      <h2>{props.title}</h2>
      {clicked ? null : (
        <div className="features-text">
          <p>{props.text}</p>
        </div>
      )}
    </div>
  );
}
