const express = require("express");
const router = express.Router();
const usrCtrl = require("../controllers/user.controllers");
const auth = require("../middleware/auth");
const authPolicy = require("../middleware/authpolicy");

router.post("/signup", authPolicy.register, usrCtrl.signup);
router.post("/login", usrCtrl.login);
router.get("/accounts/:id", auth, usrCtrl.getOneAccount);
router.delete("/accounts/:id", auth, usrCtrl.deleteAccount);

module.exports = router;
