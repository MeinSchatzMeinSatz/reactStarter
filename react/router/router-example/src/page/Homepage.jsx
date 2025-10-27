import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/about">go to About page</Link>
    </div>
  );
};

export default Homepage;
