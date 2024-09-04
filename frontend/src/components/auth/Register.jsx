import { Container } from "react-bootstrap";
import "./Register.css";
import { fetchRegister } from "../../data/fetch";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const registratioFormValue = {
    name: "",
    surname: "",
    email: "",
    password: "",
    avatar: "",
  };
  const [regFormValue, setRegFormValue] = useState(registratioFormValue);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleChangeRegistration = (event) => {
    setRegFormValue({
      ...regFormValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeAvatar = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleRegister = async () => {
    const res = await fetchRegister(regFormValue, avatarFile);
    console.log(res);
    alert("registrato");
  };

  return (
    <>
      <Container fluid="sm">
        <h1 className="blog-main-title mb-3">Registrati</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="name"
              name="name"
              value={regFormValue.name}
              onChange={handleChangeRegistration}
              />
            
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              required
              type="surname"
              name="surname"
              value={regFormValue.surname}
              onChange={handleChangeRegistration}
              />
            
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>E-mail</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                aria-describedby="inputGroupPrepend"
                required
                value={regFormValue.email}
                onChange={handleChangeRegistration}
                />
              <Form.Control.Feedback type="invalid">
                Inserisci un indirizzo email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                name="password"
                aria-describedby="inputGroupPrepend"
                required
                value={regFormValue.password}
                onChange={handleChangeRegistration}
                />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="cover" className="mt-3 mb-3">
            <Form.Label>Cover</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              onChange={handleChangeAvatar}
              placeholder="Inserisci il tuo avatar"
              />
          </Form.Group>
        </Row>
       
        
        <Button onClick={handleRegister}>Registrati</Button>
      </Form>
            </Container>
    </>
  );
};

export default Register;
