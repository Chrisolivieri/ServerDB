import Author from "../models/Authors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // verificare che la mail non sia già in uso
  const author = await Author.findOne({ email: req.body.email });

  if (author) return res.status(400).send({ error: "Email already in use" });
  // se la mail non è utilizzata allora salvare il nuovo utente con la psw hashata

  const newAuhtor = new Author({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    age: req.body.age,
    avatar: req.file ? req.file.path : null,
    //password: req.body.password // NON USARE NON SICURO
    password: await bcrypt.hash(req.body.password, 10), // usiamo brypt per criptare la psw , 10 è il numero di round di salting, che determina quanto sarà sicuro l'hash. Numeri più alti significano maggiore sicurezza ma anche maggiore lentezza nel calcolo.
    verifiedAt: new Date(), // verifica l'utente con la data corrente
  });

  const authorCreated = await newAuhtor.save(); // salviamo il nuovo utente
  res.send(authorCreated); // invia l'autore creato come risposta
};

export const login = async (req, res) => {
  // cerchiamo la mail nel db
  const author = await Author.findOne({ email: req.body.email }).select(
    "+password"
  );

  // se non c'è restituiamo un messaggio di errore generico
  if (!author) return res.status(401).send("Wrong credentials");

  // se la mail esiste verificare la correttezza della password
  if (!(await bcrypt.compare(req.body.password, author.password))) {
    return res.status(401).send("Wrong credentials"); // se la psw è sbagliata mandiamo messaggio di errore generico
  }

  // se la psw è corretta generare il jwt e restituirlo (token)
  jwt.sign(
    { id: author._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    // quando l'operazione di firma finisce verrà chiamata la callback sia se è andata bene o male, in tal caso verrà chiamato l'errore altrimenti restituisce il token
    (err, jwtToken) => {
      if (err) return res.satus(500).send();

      return res.send({
        token: jwtToken,
      });
    }
  );
};

// per i jwt base non richiede backend, ma solo tolto il token dal localStorage tramite frontend
export const logout = (req, res) => {};

export const me = (req, res) => {
  console.log(req.authAuthor);
  return res.send(req.authAuthor);
};

export const callBackGoogle = (req, res) => {
  // qui facciamo il redirect al frontend passando il jwt creato in passport

  res.redirect(`${process.env.FRONTEND_URL}?token=${req.user.jwtToken}`);
};
