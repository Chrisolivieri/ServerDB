import React, { useContext, useState } from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AuthorContext } from "../../context/AuthorContextProvider";
import Form from "react-bootstrap/Form";
import { fetchLogin } from "../../data/fetch";

const NavBar = (props) => {
  const { token, setToken } = useContext(AuthorContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [logOut, setLogOut] = useState(false);

  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    }); 
  };

  const handleLogin = async () => {
    const tokenObj = await fetchLogin(formValue);
    localStorage.setItem("token", tokenObj.token);
    setToken(tokenObj.token);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setLogOut(true);
    alert("Sei uscito")
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        <div>
        {token && (
          <div className="bottonContainer">
            <Button as={Link} to="/new" className="bottone1 bg-dark" size="lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              Nuovo Articolo
            </Button>
            <Button
              className="bottone1 bg-dark"
              size="lg"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              Log out
            </Button>
          </div>
        )}
          {!token && (
            <>
              <Button
                as={Link}
                to="/register"
                className="blog-navbar-add-button2 bg-dark"
                size="lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                </svg>
                Registrati
              </Button>
              <Button
                className="blog-navbar-add-button2 bg-dark"
                onClick={handleShow}
                size="lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                </svg>
                Login
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Inserisci i tuoi dati</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Indirizzo E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={handleChangeFormValue}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChangeFormValue}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                  </Button>
                  <Button variant="primary" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button as={Link} to={`${process.env.REACT_APP_API_URL}/login-google`}>Login con Google</Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
