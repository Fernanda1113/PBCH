const express = require("express");
const middlewares = require("../middlewares/middlewares");
const { getOrdenes, createOrder } = require("../controllers/ordenesController")

const router = express.Router();

//GET TODAS LAS ORDENES
router.get("/", middlewares.isAdmin, getOrdenes);

//POST GENERA NUEVA ORDEN SEGUN EL CARRITO
router.post("/:idCarrito", middlewares.isRegister, createOrder);

//EXPORT MODULO ROUTER
module.exports = router;