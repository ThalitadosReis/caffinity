import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="simple-grid overflow-hidden">
      <div className="simple-grid__cell simple-grid__cell--fill p-0">
        <img
          src="https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Coffee"
        />
      </div>
      <div className="simple-grid__cell simple-grid__cell--1/3 my-auto">
        <h2>Login</h2>
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
          <button className="btn btn-secondary mb-2" type="submit">
            Login
          </button>

          <br />
          <Link to="/register">
            New to Caffinity?
            <span> Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
