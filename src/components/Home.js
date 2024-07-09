import React from 'react';
import { Link } from 'react-router-dom';
// import './Home.css'; 

const Home = () => (
  <div className="home-container">
    <h1>Welcome to Seven Hotel</h1>
    <Link to="/login">
      <button>Login</button>
    </Link>
    <Link to="/register">
      <button>Register</button>
    </Link>
  </div>
);

export default Home;
