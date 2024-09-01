import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import {AuthrContextProvider} from "../../context/AuthrContextProvider";
import { useContext } from "react";

const Home = props => {
  const {token} = useContext (AuthrContextProvider)
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {token && <BlogList />}
    </Container>
  );
};

export default Home;
