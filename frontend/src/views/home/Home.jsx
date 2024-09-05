import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useContext } from "react";
import { AuthorContext } from "../../context/AuthorContextProvider";
import { useSearchParams } from "react-router-dom";
import { fetchME } from "../../data/fetch";

const Home = props => {
  const {token, setToken} = useContext (AuthorContext)
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let token = localStorage.getItem("token");
  
    // se il token non è presente nel localStorage, prelevalo dall'URL (query string)
    if (!token) {
      token = searchParams.get("token");
      if (token) {
        // se troviamo il token nell'URL, lo salviamo nel localStorage
        localStorage.setItem("token", token);
      }
       // rimuovi il token dall'URL senza ricaricare la pagina
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  
    // Imposta il token nello stato dell'applicazione
    setToken(token);
  }, [searchParams]);
   
  // useEffect(() => {
  //   (async () => {
      
  //       const meInfo = await fetchME();
  //       console.log(meInfo);
      
  //   })();
  // }, []);
  return (

    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {!token && <h2>Accedi o registrati prima di continuare</h2>}
      {token && <BlogList />}
    </Container>
  );
};

export default Home;
