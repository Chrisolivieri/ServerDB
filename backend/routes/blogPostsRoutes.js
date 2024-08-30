// importiamo sempre express nei file di rotte
import express from "express";
import * as blogPostsController from "../controllers/blogPosts.controller.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import * as commentController from "../controllers/comment.controller.js";

const route = express.Router();

// recupero tutti i blogPosts
route.get("/", blogPostsController.allBlogPosts);

// recupero un singolo blogPost
route.get("/:id", blogPostsController.singleBlogPost);

// creazione di un nuovo blogPost
route.post("/", uploadCloudinary.single("cover"), blogPostsController.createBlogPost);

// modifica di un blogPost
route.put("/:id", blogPostsController.updateBlogPost);

// rimozione di un blogPost
route.delete("/:id", blogPostsController.deleteBlogPost);

// modifica dell'immagine di copertina
route.patch("/:id/cover", uploadCloudinary.single("cover"), blogPostsController.patchCoverBlogPost);

// recupero tutti i commenti di un singolo blogPost
route.get("/:id/comments", commentController.readAllComments);

// recupero un singolo commento
route.get("/:id/comments/:id", commentController.readOneComment);

// creazione di un nuovo commento a un blogPost
route.post("/:id/comments", commentController.createComment);

// modifica di un commento
route.put("/:id/comments/:id", commentController.updateComment);

// rimozione di un commento
route.delete("/:id/comments/:id", commentController.deleteComment);


export default route;
