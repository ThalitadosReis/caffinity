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
        <h4>Login to Caffinity</h4>
        <form className="text-center">
          <input
            className="form-control mb-2"
            placeholder="Username"
            type="text"
          />
          <input
            className="form-control mb-2"
            placeholder="Password"
            type="password"
          />
          <button className="btn btn-dark px-4 mb-2" type="submit">
            Login
          </button>

          <p>
            New to Caffinity?
            <Link to="/register">
              <span className="text-primary"> Register!</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
