import GoogleStrategy from "passport-google-oauth20";
import Author from "../models/Authors.js";
import jwt from "jsonwebtoken";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}${process.env.GOOGLE_CALLBACK}`,
  },

  async function (accessToken, refreshToken, profile, passportNext) {
    console.log(profile);
    const {
      given_name: name,
      family_name: surname,
      email,
      sub: googleId,
    } = profile._json;

    // nel db verifichiamo se esiste l'utente
    let author = await Author.findOne({ googleId });

    // se l'utente non esiste allora lo creiamo
    if (!author) {
      const newAuthor = new Author({
        googleId,
        name,
        surname,
        email,
      });

      author = await newAuthor.save();
    }

    // creiamo il jwt per l'utente

    jwt.sign(
      { id: author.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      // quando l'operazione di firma finisce verrà chiamata la callback sia se è andata bene o male, in tal caso verrà chiamato l'errore altrimenti restituisce il token
      (err, jwtToken) => {
        if (err) return res.satus(500).send();
        
    // passportNext ha bisogno di 2 argomenti
    // chiamiamo il prossimo middleware di Passport
        return passportNext(null,{ jwtToken });
      }
    );

  }
);

export default googleStrategy;
