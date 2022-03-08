const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));

//ROUTER
const { Router } = express;
const router = Router();
const routerCart = require('./routerCart.js');
const routerProducts = require('./routerProducts.js')

router.use("/api/cart", routerCart)
router.use("/api/products", routerProducts)

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    publicDir: __dirname + "/views/public",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

app.listen(8080);