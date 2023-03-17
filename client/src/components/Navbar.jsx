import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./NavBar.css";

export default function NavBar() {
  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand className="d-flex align-items-center" href="#">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9896/9896631.png"
            alt="logo"
          />
          Caffinity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Form.Control
            type="text"
            placeholder="What are you looking for?"
            style={{
              boxShadow: "none",
            }}
          />
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="#">
              <AiOutlineShoppingCart size={25} />
            </Nav.Link>
            <Nav.Link className=" px-3" href="#">
              Login
            </Nav.Link>
            <Nav.Link className=" button" href="#">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
