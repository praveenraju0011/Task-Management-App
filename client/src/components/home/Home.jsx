import React from "react";
import "./Home.css";

export const Home = () => {
  return <div className="home d-flex justify-content-center align-items-center">
    <div className="container d-flex justify-content-center align-items-center flex-column">
    <h1>
        Organize your work
    </h1>
    <p className="p-text">
        Become focused, organized and stress free <br />
        with our Task management app
    </p>
    <button className="home-btn p-2">
        Make Todo List
    </button>
    </div>
  </div>;
};
