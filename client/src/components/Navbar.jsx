import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <Navbar expand="md">
      <Container>
        <Link className="d-flex align-items-center" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9896/9896631.png"
            alt="logo"
          />
          Caffinity
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="btn" to="/">
              Cart
            </Link>
            <Link className="btn" to="/login">
              Login
            </Link>
            <Link className="btn button" to="/register">
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
