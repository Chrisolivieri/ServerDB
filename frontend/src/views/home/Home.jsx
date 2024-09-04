import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useContext } from "react";
import { AuthorContext } from "../../context/AuthorContextProvider";

const Home = props => {
  const {token} = useContext (AuthorContext)
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {!token && <h2>Accedi o registrati prima di continuare</h2>}
      {token && <BlogList />}
    </Container>
  );
};

export default Home;
