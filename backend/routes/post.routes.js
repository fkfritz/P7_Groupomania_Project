const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controllers");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Les routes pour:

//Afficher tous les posts
router.get("/", auth, postCtrl.getPost);

//Créer un post
router.post("/", auth, multer, postCtrl.createPost);

//Afficher un seul post
router.get("/:id", auth, postCtrl.getOnePost);

//Modifier un post
router.put("/:id", auth, multer, postCtrl.updatePost);

//Supprimer un post
router.delete("/:id", auth, postCtrl.deletePost);


//
//Créer un commentaire
router.post("/comment", auth, postCtrl.createComment);

// Supprimer un commentaire
router.delete("/comment/:id", auth, postCtrl.deleteComment);

module.exports = router;
