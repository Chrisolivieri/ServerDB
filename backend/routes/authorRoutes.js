// importiamo sempre express nei file di rotte e i nostri modelli schema
import express from "express";
import * as authorController from "../controllers/author.controller.js"
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import authorization from "../middlewares/authorization.js";

const route = express.Router();


// recupero tutti gli autori
route.get("/", authorController.readAll);

// recupero un singolo autore
route.get("/:id", authorController.readOne);

// creazione di un nuovo autore
route.post("/", authorController.postOne);

// modifica di un autore
route.put("/:id",authorization, authorController.putOne);

// rimozione di un autore
route.delete("/:id",authorization, authorController.deleteOne);

// recupero tutti i blogPosts di un singolo autore
route.get("/:id/blogPosts", authorization, authorController.blogOne);

// modifica dell'avatar
route.patch("/:id/avatar",authorization, uploadCloudinary.single("avatar") , authorController.patchAvatar)

export default route;
