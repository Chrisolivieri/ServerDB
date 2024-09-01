import express from "express"
import * as authController from "../controllers/auth.controller.js"

const authRuoute = express.Router()

// registro di un nuovo utente
authRuoute.post("/register", authController.register)

// login di un utente
authRuoute.post("/login", authController.login)

// logout di un utente
//authRuoute.post("/logout", authController.logout)

// recupero l'utente loggato
authRuoute.get("/register", authController.me)

export default authRuoute