// importiamo sempre express nei file di rotte e i nostri modelli schema
import express from "express";
import author from "../models/Authors.js";

const route = express.Router();

//metodo get,post,put,delete accettano 2 parametri (req, res(richiesta e risposta))
route.get("/", async (req, res) => {
  
  const page = req.query.page || 1;
  let perPage = req.query.perPage || 3;
  perPage = perPage > 15 ? 15 : perPage 
 
  const authors = await author.find({}) //qui recuperiamo tutti gli autori nel database,callback async

  .sort({ name: 1 , age: 1})   // li ordiniamo per nome in modo crescente
  
  .skip((page -1) * perPage) // lo paginiamo a 3 per 3 elementi a volta 

  .limit(perPage) // indico gli elementi da mostrare nella pagina

  res.send(authors);
});

route.get("/:id", async (req, res) => {
  // andiamo nel database e recuperiamo l'autore corrispondente all'id
  const id = req.params.id;

  try {
    const findAuthor = await author.findById(id);
    res.send(findAuthor);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
});

route.post("/", async (req, res) => {
  const userData = req.body;
  //questo nuovo utente lo creerò con i dati che ho in UserData che è il body della richiesta e ci metto il model importato
  const newAuthor = new author(userData);

  try {
    //lo salviamo nel database
    const savedAuthor = await newAuthor.save();

    //invia l'autore creato come risposta
   return res.status(201).send(savedAuthor);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "something went wrong" });
  }
});

route.put("/:id", async (req, res) => {
  const id = req.params.id;
  const dataToModify = req.body;

  try {
    //chiedo al database di modificare l'utente con l'id specificato
    await author.findByIdAndUpdate(id, dataToModify);

    // se volessimo restire l'autore modificato, dobbiamo usare findById
    const updatedAuthor = await author.findById(id);

    //invia l'autore modificato come risposta
    res.send(updatedAuthor);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    //trova e elimina l'autore con l'id specificato
    const deletedAuthor = await author.findByIdAndDelete(id);

    //controlla se l'autore esiste
    if (!deletedAuthor) {
      return res.status(404).send({ error: "Author not found" });
    }

    //invia l'autore eliminato come risposta
    res.send(deletedAuthor);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the author" });
  }
});

export default route;
