// importiamo sempre express nei file di rotte
import express from "express";
import * as blogPostsController from "../controllers/blogPosts.controller.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import * as commentController from "../controllers/comment.controller.js";
import authorization from "../middlewares/authorization.js";
// import authorization from "../middlewares/authorization.js";

const route = express.Router();

//  route.use(authorization)

// recupero tutti i blogPosts
route.get("/", blogPostsController.allBlogPosts);

// recupero un singolo blogPost
route.get("/:id", blogPostsController.singleBlogPost);

// creazione di un nuovo blogPost
route.post("/", uploadCloudinary.single("cover"), authorization, blogPostsController.createBlogPost);

// modifica di un blogPost
route.put("/:id", authorization, blogPostsController.updateBlogPost);

// rimozione di un blogPost
route.delete("/:id", authorization, blogPostsController.deleteBlogPost);

// modifica dell'immagine di copertina
route.patch("/:id/cover", authorization, uploadCloudinary.single("cover"), blogPostsController.patchCoverBlogPost);

// recupero tutti i commenti di un singolo blogPost
route.get("/:id/comments", commentController.readAllComments);

// recupero un singolo commento
route.get("/:id/comments/:id", commentController.readOneComment);

// creazione di un nuovo commento a un blogPost
route.post("/:id/comments", authorization, commentController.createComment);

// modifica di un commento
route.put("/:id/comments/:id",  authorization, commentController.updateComment);

// rimozione di un commento
route.delete("/:id/comments/:id", authorization, commentController.deleteComment);


export default route;
