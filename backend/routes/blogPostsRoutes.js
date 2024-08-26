// importiamo sempre express nei file di rotte
import express from "express";
import * as blogPostsController from "../controllers/blogPosts.controller.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const route = express.Router();

// recupero tutti i blogPosts
route.get("/", blogPostsController.allBlogPosts);

// recupero un singolo blogPost
route.get("/:id", blogPostsController.singleBlogPost);

// creazione di un nuovo blogPost
route.post("/", blogPostsController.createBlogPost);

// modifica di un blogPost
route.put("/:id", blogPostsController.updateBlogPost);

// rimozione di un blogPost
route.delete("/:id", blogPostsController.deleteBlogPost);

// modifica dell'immagine di copertina
route.patch("/:id/cover", uploadCloudinary.single("cover"), blogPostsController.patchCoverBlogPost);

export default route;
