import blogPost from "../models/BlogPost.js";
import transport from "../services/mailService.js";
import Author from "../models/Authors.js";

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
    .limit(perPage) // limita il numero di post per pagina
    .populate("author"); // popola l'oggetto blogPost con l'autore
  res.send(blogPosts);
};

export const singleBlogPost = async (req, res) => {
  // andiamo nel database e recuperiamo l'autore corrispondente all'id
  const id = req.params.id;

  try {
    const findBlogPost = await blogPost.findById(id).populate("author");
    res.send(findBlogPost);
  } catch (err) {
     res.status(400).send({ error: "something went wrong" });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    // verifica che req.file esista, altrimenti imposta cover a null
    const coverPath = req.file ? req.file.path : null;

    // log per debug
    console.log("Received readTime:", req.body.readTime);

    let readTime;
    try {
      // verifica se readTime è una stringa JSON valida prima di parsare
      readTime = typeof req.body.readTime === 'string'
        ? JSON.parse(req.body.readTime)
        : req.body.readTime;
    } catch (parseError) {
      console.error("Error parsing readTime:", parseError);
      return res.status(400).send({ error: "Invalid readTime format" });
    }

    // creazione di un nuovo post con i dati dal corpo della richiesta e il percorso del file
    const newPost = new blogPost({
      ...req.body,
      cover: coverPath,
      readTime, // Usa il valore parsato o il valore originale
    });

    // salvataggio del nuovo post nel database
    const savedPost = await newPost.save();
    
    // trova l'autore del post per inviare un'email
    const author = await Author.findById(savedPost.author);
    if (!author) {
      return res.status(404).send({ error: "Author not found" });
    }

    // invia un'email all'autore per confermare la creazione del post
    console.log("Author email:", author.email);
    await transport.sendMail({
      from: "no-reply@example.com", // indirizzo di provenienza
      to: author.email, // indirizzo di destinazione
      subject: "Post created", // oggetto
      text: "You've created a new post", // testo
      html: "<b>You've created a new post, congrats!</b>", // corpo HTML
    });

    // invia il post creato come risposta
    res.status(201).send(savedPost);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Something went wrong" });
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
