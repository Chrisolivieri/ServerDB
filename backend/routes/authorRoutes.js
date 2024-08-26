// importiamo sempre express nei file di rotte e i nostri modelli schema
import express from "express";
import * as authorController from "../controllers/author.controller.js"
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const route = express.Router();

// recupero tutti gli autori
route.get("/", authorController.readAll);

// recupero un singolo autore
route.get("/:id", authorController.readOne);

// creazione di un nuovo autore
route.post("/", authorController.postOne);

// modifica di un autore
route.put("/:id", authorController.putOne);

// rimozione di un autore
route.delete("/:id", authorController.deleteOne);

// recupero tutti i blogPosts di un singolo autore
route.get("/:id/blogPosts", authorController.blogOne);

// modifica dell'avatar
route.patch("/:id/avatar", uploadCloudinary.single("avatar") , authorController.patchAvatar)

export default route;
