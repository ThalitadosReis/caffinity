import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
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
          {/* <Form.Control
            type="text"
            placeholder="What are you looking for?"
            style={{
              boxShadow: "none",
            }}
          /> */}
          <Nav className="ms-auto d-flex align-items-center">
            {/* <Link to="/cart">
              <AiOutlineShoppingCart size={25} />
            </Link> */}
            <Link className="btn px-3" to="/login">
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
