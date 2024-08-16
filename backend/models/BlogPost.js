import { Schema, model } from "mongoose";

//schema servono 2 argomenti: new Schema({},{})
const blogPostSchema = new Schema(
  {
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    cover: {
      type: String,
    },
    readTime: {
      value : Number,
      unit: String,
    },
    author: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  {
    collection: "blogPosts",
  }
);

// mettiamo il model in una variabile e la esportiamo
const Post = model("Post", blogPostSchema);

export default Post;
