import blogPost from "../models/BlogPost.js";
import transport from "../services/mailService.js";

export const allBlogPosts = async (req, res) => {
  const page = req.query.page || 1; // numero della pagina, di default è 1
  const perPage = req.query.perPage || 2; // numero di elementi per pagina, di default è 2
  const blogPosts = await blogPost
    .find(
      req.query.title
        ? { title: { $regex: req.query.title, $options: "i" } }
        : {}
    ) // ricerca per titolo, di default è vuota se il titolo non è specificato
    .sort({ title: 1 }) // ordinamento per titolo
    .skip((page - 1) * perPage) // elementi da saltare
    .limit(perPage); // limita il numero di post per pagina
  res.send(blogPosts);
};

export const singleBlogPost = async (req, res) => {
  // andiamo nel database e recuperiamo l'autore corrispondente all'id
  const id = req.params.id;

  try {
    const findBlogPost = await blogPost.findById(id);
    res.send(findBlogPost);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};

export const createBlogPost = async (req, res) => {
  
  //questo nuovo post lo creerò con i dati che ho in PostData che è il body della richiesta e ci metto il model importato
  const newPost = new blogPost(req.body);

  try {
    const savedPost = await newPost.save(); //lo salviamo nel database

    // se la risposta è positiva viene inviata una mail
    await transport.sendMail({
      from: "no-reply@example.com", // indirizzo di provenienza
      to: savedPost.author, // indirizzo di destinazione
      subject: "Post created", // oggetto
      text: "You've created a new post", // testo
      html: "<b>You've created a new post,congrats!</b>", // html body
    });

    res.status(201).send(savedPost); //invia il post creato come risposta
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "something went wrong" });
  }
};

export const updateBlogPost = async (req, res) => {
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
};

export const deleteBlogPost = async (req, res) => {
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
};

export const patchCoverBlogPost = async (req, res) => {
  const id = req.params.id;
  const dataToModify = { cover: req.file.path };
  try {
    //chiedo al database di modificare l'utente con l'id specificato
    await blogPost.findByIdAndUpdate(id, dataToModify, { new: true });
    // se volessimo restituire l'autore modificato, dobbiamo usare findById
    const updatedBlogPost = await blogPost.findById(id);
    //invia l'autore modificato come risposta
    res.send(updatedBlogPost);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
};
