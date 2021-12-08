const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controllers");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, postCtrl.getPost);
router.post("/", auth, multer, postCtrl.createPost);

router.get("/:id", auth, postCtrl.getOnePost);

router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
// router.post("/:id/like", auth, postCtrl.likeOrDislike);

//
//Créer un commentaire
router.post("/comment", auth, postCtrl.createComment);

// Supprimer un commentaire
router.delete("/comment/:id", auth, postCtrl.deleteComment);

module.exports = router;
