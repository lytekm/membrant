import Header from "../../components/header/head";
import { Link } from "react-router-dom";
import React from "react";

const MainPage = (props) => {
  return (
    <div className="mainpage">
      <Header />
      <img
        className="mainpage-image"
        src="https://i.insider.com/60144316a7c0c4001991dde6?width=1000&format=jpeg&auto=webp"
        alt="mainpage"
      />
      <div className="intro">
        <h2>What is Membrant?</h2>
        <p>
          Membrant is a web application that makes the development process
          <br />
          easier. It is a tool that helps you to create and manage your
          projects.
        </p>

        <p>
          Membrant has tools to help you plan your projects, <br /> and keep
          track of the workflow while working with a team or on your own.
        </p>

        <p>
          Ready to go? Press here to <Link to={"/signup"}>get started!</Link>
        </p>
      </div>
    </div>
  );
};

export default MainPage;
