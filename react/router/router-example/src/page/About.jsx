import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  function goToHompage() {
    navigate("/");
  }

  return (
    <div>
      <h1>About page</h1>
      <button onClick={() => goToHompage()}>go to Homepage</button>
    </div>
  );
};

export default About;
