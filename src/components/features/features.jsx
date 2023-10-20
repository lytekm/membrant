import { React, useState } from "react";

export default function Features(props) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <div
      className={clicked ? "features-clicked" : "features"}
      onClick={handleClick}
    >
      <h1>{props.title}</h1>
      {clicked ? (
        <div className="features-body">
          <p>{props.text}</p>
          <img src={props.img} alt="img" />
        </div>
      ) : null}
    </div>
  );
}
