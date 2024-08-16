import { Schema, model } from "mongoose";

//schema servono 2 argomenti: new Schema({},{})
const authorSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      // per renderla unica
      unique: true,
      // per rendere obbligatoria
      required: true,
    },
    age: {
      type: Number,
      minLenght: 0,
      maxLenght: 100,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    approved: Boolean,
  },
  {
    collection: "authors",
  }
);

// mettiamo il model in una variabile e la esportiamo
const Author = model("Author", authorSchema);

export default Author;
