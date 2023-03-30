import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="container my-5 p-5">
      <h2>Login Page</h2>
      <form>
        <input
          className="form-control my-2"
          placeholder="Username"
          type="text"
        />
        <input
          className="form-control my-2"
          placeholder="Password"
          type="password"
        />
        <button className="btn btn-secondary" type="submit">
          Login
        </button>

        <br />
        <Link to="/register">
          New to Caffinity?
          <span> Register</span>
        </Link>
      </form>
    </div>
  );
}
