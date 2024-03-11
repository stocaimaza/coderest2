import express from "express";
const router = express.Router();

//Rutas para el renderizado

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/profile", (req, res) => {
    res.render("profile");
})

export default router;