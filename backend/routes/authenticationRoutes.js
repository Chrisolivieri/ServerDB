import express from "express";
import * as authController from "../controllers/auth.controller.js";
import authorization from "../middlewares/authorization.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import passport from "passport";

const authRuoute = express.Router();

// registro di un nuovo utente
authRuoute.post(
  "/register",
  uploadCloudinary.single("avatar"),
  authController.register
);

// login di un utente
authRuoute.post("/login", authController.login);

// logout di un utente
//authRuoute.post("/logout", authController.logout)

// recupero l'utente loggato
authRuoute.get("/me", authorization, authController.me);

// login con google
authRuoute.get(
    '/login-google',
    passport.authenticate('google', { scope: ['profile', 'email'] })) // middleware di passport che ci ridireziona alla pagina di Google
;

authRuoute.get(
  "/callback-google",
  passport.authenticate("google", { session: false }),
  authController.callBackGoogle
);

export default authRuoute;
