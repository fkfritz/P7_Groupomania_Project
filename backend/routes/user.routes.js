const express = require("express");
const router = express.Router();
const usrCtrl = require("../controllers/user.controllers");
const auth = require("../middleware/auth");
const authPolicy = require("../middleware/authpolicy");
const multer = require("../middleware/multer-config");

//Les routes pour:

//Créer un utilisateur
router.post("/signup", authPolicy.register, usrCtrl.signup);

//Connextion de l'utisateur
router.post("/login", usrCtrl.login);

//Afficher les comptes de tous les utilisateurs
router.get("/accounts/", auth, usrCtrl.getAllAccounts);

//Afficher un seul utisateurs
router.get("/accounts/:id", auth, usrCtrl.getOneAccount);

//Supprimer un utilisateur
router.delete("/accounts/:id", auth, usrCtrl.deleteAccount);

//modifier le compte d'un utilisateur
router.put("/accounts/:id", auth, multer, usrCtrl.modifyAccount);

module.exports = router;
