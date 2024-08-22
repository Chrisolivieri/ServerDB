// importiamo sempre express nei file di rotte
import express from "express";
import blogPost from "../models/BlogPost.js";

const route = express.Router();

route.get("/", async (req, res) => {
  const page = req.query.page || 1; // numero della pagina, di default è 1
  const perPage = req.query.perPage || 2; // numero di elementi per pagina, di default è 2
  const blogPosts = await blogPost.find(req.query.title ?{title: {$regex: req.query.title,$options: "i"}}:{}) // ricerca per titolo, di default è vuota se il titolo non è specificato
  .sort({title: 1 }) // ordinamento per titolo
  .skip((page -1) * perPage) // elementi da saltare
  .limit(perPage) // limita il numero di post per pagina
  res.send(blogPosts);
});

route.get("/:id", async (req, res) => {
  // andiamo nel database e recuperiamo l'autore corrispondente all'id
  const id = req.params.id;

  try {
    const findBlogPost = await blogPost.findById(id);
    res.send(findBlogPost);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
});

route.post("/", async (req, res) => {
    const postData = req.body;
    //questo nuovo post lo creerò con i dati che ho in PostData che è il body della richiesta e ci metto il model importato
    const newPost = new blogPost(postData);
  
    try {
      //lo salviamo nel database
      const savedPost = await newPost.save();
  
      //invia il post creato come risposta
      res.status(201).send(savedPost);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "something went wrong" });
    }  });

route.put("/:id", async (req, res) => {
  const id = req.params.id;
  const dataToModify = req.body;
  try {
    //chiedo al database di modificare l'utente con l'id specificato
    await blogPost.findByIdAndUpdate(id, dataToModify);
    // se volessimo restire l'autore modificato, dobbiamo usare findById
    const updatedBlogPost = await blogPost.findById(id);
    //invia l'autore modificato come risposta
    res.send(updatedBlogPost);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //trova e elimina l'autore con l'id specificato
    const deletedBlogPost = await blogPost.findByIdAndDelete(id);
    //controlla se l'autore esiste
    if (!deletedBlogPost) {
      return res.status(404).send({ error: "BlogPost not found" });
    }
    //invia l'autore eliminato come risposta
    res.send(deletedBlogPost);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
});

export default route;
