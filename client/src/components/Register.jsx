import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, newUser)
      .then((response) => {
        console.log("New user created successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error creating new user", error);
      });
  };

  return (
    <div className="simple-grid overflow-hidden">
      <div className="simple-grid__cell simple-grid__cell--fill p-0">
        <img
          src="https://images.pexels.com/photos/1724194/pexels-photo-1724194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Coffee"
        />
      </div>
      <div className="simple-grid__cell simple-grid__cell--1/3 my-auto">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control my-2"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-control my-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control my-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-secondary mb-2" type="submit">
            Register
          </button>

          <br />
          <Link to="/login">
            Already have an account?
            <span> Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
