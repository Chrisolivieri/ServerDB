import author from "../models/Authors.js";
import blogPost from "../models/BlogPost.js";

export const readAll = async (req, res) => {
  //metodo get,post,put,delete accettano 2 parametri (req, res(richiesta e risposta))
  const page = req.query.page || 1;
  let perPage = req.query.perPage || 3;
  perPage = perPage > 15 ? 15 : perPage;

  const authors = await author
    .find({}) //qui recuperiamo tutti gli autori nel database,callback async

    .sort({ name: 1, age: 1 }) // li ordiniamo per nome in modo crescente

    .skip((page - 1) * perPage) // lo paginiamo a 3 per 3 elementi a volta

    .limit(perPage); // indico gli elementi da mostrare nella pagina

  res.send(authors);
};

export const readOne = async (req, res) => {
  // andiamo nel database e recuperiamo l'autore corrispondente all'id
  const id = req.params.id;

  try {
    const findAuthor = await author.findById(id);
    res.send(findAuthor);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const postOne = async (req, res) => {
  const userData = req.body;
  //questo nuovo utente lo creerò con i dati che ho in UserData che è il body della richiesta e ci metto il model importato
  const newAuthor = new author(userData);

  try {
    //lo salviamo nel database
    const savedAuthor = await newAuthor.save();
    console.log(savedAuthor);

    //invia l'autore creato come risposta
    return res.status(201).send(savedAuthor);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "something went wrong" });
  }
};

export const putOne = async (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  try {
    // trova e aggiorna l'autore esistente con i nuovi dati
    const updatedAuthor = await author.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updatedAuthor) {
      return res.status(404).send({ error: "Author not found" });
    }

    // invia l'autore aggiornato come risposta
    res.send(updatedAuthor);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Something went wrong" });
  }
};

export const deleteOne = async (req, res) => {
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
};

export const blogOne = async (req, res) => {
  try {
    const AllAuthorBlogPosts = await blogPost.find({ author: req.params.id }); // recupero tutti i blogPosts del singolo autore con l'id specificato
    res.send({
      data: AllAuthorBlogPosts, // invio i blogPosts
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "something went wrong" });
  }
};

export const patchAvatar = async (req, res) => {
  const id = req.params.id;
  const userData = { avatar: req.file.path };

  try {
    // trova e aggiorna l'autore esistente con i nuovi dati
    const updatedAuthor = await author.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updatedAuthor) {
      return res.status(404).send({ error: "Author not found" });
    }

    // invia l'autore aggiornato come risposta
    res.send(updatedAuthor);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Something went wrong" });
  }
};
