import React from "react";
import MainBackground from "../../components//header/main-background.png";

const Header = (props) => {
  return (
    <React.Fragment>
      <p className="header-subtitle">The art of Organization</p>
      <div className="image">
        <img src={MainBackground} alt="mainpage" />
      </div>
      <div className="header">
        <h1 className="header-title">Membrant</h1>
      </div>
    </React.Fragment>
  );
};

export default Header;
