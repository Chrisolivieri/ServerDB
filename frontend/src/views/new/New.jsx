import React, { useCallback, useContext, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import draftToHtml from "draftjs-to-html";
import { fetchNewPost } from "../../data/fetch";
import { AuthorContext } from "../../context/AuthorContextProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const [cover, setCover] = useState("");
  const { token } = useContext(AuthorContext);
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  const [alert, setAlert] = useState(false);

  const handleShowAlert = () => {
    setAlert(true);
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const initialFormValue = {
    category: "",
    title: "",
    cover: "",
    readTime: {
      value: 0,
      unit: "",
    },
    author: decodedToken.id,
    content: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    handleChangeFormValue(event);
    setCover(event.target.files[0]);
  };

  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    console.log(text);
    // console.log(convertToRaw(value.getCurrentContent()))
    setFormValue({
      ...formValue,
      content: draftToHtml(value), //drafToHtml(value) prende il valore della text area e lo converte in html
    });
  });
  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          {/* onChange sta in ascolto dell'evento e viene chiamata la funzione */}
          <Form.Control
            onChange={(event) => handleChangeFormValue(event)}
            size="lg"
            placeholder="Title"
            name="title"
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            onChange={(event) => handleChangeFormValue(event)}
            name="category"
            size="lg"
            as="select"
          >
            <option>Seleziona una categoria</option>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Group controlId="cover" className="mt-3 mb-3">
            <Form.Label>Cover</Form.Label>
            <Form.Control
              type="file"
              name="cover"
              onChange={handleChangeImage}
            />
          </Form.Group>
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor
            value={text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="button"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={() => fetchNewPost(formValue, cover) && handleShowAlert()}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
      {alert && (
        <Alert variant="success" className="mt-5" onClose={handleCloseAlert} dismissible>
          {alert}
          <h2>Post creato con successo</h2>
        </Alert>
      )}
    </Container>
  );
};

export default NewBlogPost;
