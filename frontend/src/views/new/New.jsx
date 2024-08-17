import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import {convertToRaw} from "draft-js"
import draftToHtml from "draftjs-to-html"
import { fetchNewPost } from "../../data/fetch";

const NewBlogPost = props => {
  const [text, setText] = useState("");
  const initialFormValue = {
    category: "",
    title: "",
    cover: "https://picsum.photos/300/300",
    readTime: {
        value: 0,
        unit: ""
    },
    author: "",
    content: ""
  }
  const [formValue, setFormValue] = useState(initialFormValue)
  const handleChangeFormValue = (event) =>{
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }
  const handleChange = useCallback(value => {
  
    setText(draftToHtml(value));
    console.log(text)
    // console.log(convertToRaw(value.getCurrentContent()))
    setFormValue({
      ...formValue,
      content:draftToHtml(value) //drafToHtml(value) prende il valore della text area e lo converte in html
    })
  });
  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          {/* onChange sta in ascolto dell'evento e viene chiamata la funzione */}
          <Form.Control onChange={(event) => handleChangeFormValue(event)} size="lg" placeholder="Title" />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control onChange={(event)=>handleChangeFormValue(event)} size="lg" as="select">
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }} 
            onClick={() => fetchNewPost(formValue)}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
