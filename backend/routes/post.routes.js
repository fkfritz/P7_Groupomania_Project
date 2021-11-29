const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, postCtrl.getPost);
router.post("/", auth, multer, postCtrl.createPost);

router.get("/:id", auth, postCtrl.getOnePost);

router.put("/:id", auth, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likeOrDislike);

module.exports = router;
