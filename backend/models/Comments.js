import { Schema, model } from "mongoose";

//schema servono 2 argomenti: new Schema({},{})
const commentsSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    content: {
      type: String,
      minlenght: 1,
      maxlenght: 200,
      trim: true,
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

// mettiamo il model in una variabile e la esportiamo
const Comments = model("Comments", commentsSchema);

export default Comments;
