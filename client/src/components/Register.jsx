import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      .then((Response) => {
        console.log("New user created successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error creating new user");
      });
  };

  return (
    <div className="container mt-5 p-5">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="btn btn-dark" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
