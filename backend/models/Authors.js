import { Schema, model } from "mongoose";

//schema servono 2 argomenti: new Schema({},{})
const authorSchema = new Schema(
  {
    googleId: String,
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      // per renderla unica
      unique: true,
      // per rendere obbligatoria
      required: true,
      lowercaase: true,
      trim: true,
    },
    age: {
      type: Number,
      minLenght: 0,
      maxLenght: 100,
    },
    password: {
      type: String,
      select: false, // fa in modo che la psw hashata non sia visibile
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    approved: Boolean,
    verifiedAt: Date, // data di verifica
    verificationCode: String // codice di verifica
  },
  {
    collection: "authors",
  }
);

// mettiamo il model in una variabile e la esportiamo
const Author = model("Author", authorSchema);

export default Author;
