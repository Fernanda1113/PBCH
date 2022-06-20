const express = require("express");
const passportConfig = require("../passport/passportConfig")
const {getUser} = require("../controllers/loginController")

const app = express();
const { Router } = express;
const router = new Router();

//GET LOGIN
router.get("/", getUser);

//POST LOGIN
router.post("/", passportConfig.authenticate("local-login",{
  successRedirect:"/index.html",
  failureRedirect:"/loginError.html"
}))

//EXPORT MODULO ROUTER
module.exports = router;