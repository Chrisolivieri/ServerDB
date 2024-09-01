import jwt from "jsonwebtoken";
import Author from "../models/Authors.js";

export default (req, res, next) => {
  // vericare se c'è l'header Authorization e se è di tipo Bearer
  // Authorization: Bearer qhfsdkfjsladfjkdsldjkf (token)
  //console.log("avvio middlware")
  if (!req.headers.authorization) return res.status(401).send("Unauthorized");
  const parts = req.headers.authorization.split(" ");
  //console.log(parts.length)
  // divide l'intestazione Authorization in due parti. Tipicamente, il formato è Bearer <token>, quindi viene diviso con uno spazio.
  if (parts.length != 2) {
    console.log("controllo lunghezza");
    return res.status(401).send("Unauthorized 2");
  } // verifica che l'operazione di divisione abbia prodotto esattamente due parti, assicurandosi che l'intestazione Authorization segua il formato previsto.

  if (parts[0] != "Bearer") return res.status(401).send("Unauthorized 3"); // se la prima parte è diversa da bearer restituisce errore

  const jwtToken = parts[1];
  //console.log(`token ${jwtToken}`);
  //verificare la firma del token
  jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).send("Unauthorized 4");

    const author = await Author.findById(payload.id);

    if (!author) return res.status(401).send("Unauthorized 5");

    req.authAuthor = author; // aggiunge alla richiesta le informazione dell'utente loggato

    next();
  });
};
