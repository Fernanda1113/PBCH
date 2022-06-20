const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  createCarrito,
  addPtoToCarrito,
  deleteCarrito,
  deletePtoFromCarrito,
  getPtosFromCarrito,
  getCarritos,
} = require("../controllers/carritoController");

const router = express.Router();

//POST VACIO CREA UN NUEVO CARRITO
router.post("/", middlewares.isRegister, createCarrito);

//POST CON ID DE PTO
router.post("/:idCarrito/:idPto", middlewares.isRegister, addPtoToCarrito);

//DELETE CARRITO SEGUN ID
router.delete("/:id", middlewares.isRegister, deleteCarrito);

//DELETE DE UN PRODUCTO DE UN CARRITO SEGUN ID
router.delete(
  "/:idCarrito/:idPto",
  middlewares.isRegister,
  deletePtoFromCarrito
);

//GET PRODUCTOS EN CARRITO POR ID
router.get("/:id", middlewares.isRegister, getPtosFromCarrito);

//GET TODOS LOS CARRITOS
router.get("/", middlewares.isAdmin, getCarritos);

//EXPORT MODULO ROUTER
module.exports = router;