const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto,
} = require("../controllers/productosController");
const router = express.Router();

//GET TODOS LOS PRODUCTOS
router.get("/", getPtos);

//GET PRODUCTO POR ID
router.get("/:id", getPtoId);

//POST CON PTO NUEVO ENVIADO POR PARAMETRO
router.post("/"/* , middlewares.isAdmin */, createPto);

//PUT MODIFICANDO SEGUN ID
router.put("/:id"/* , middlewares.isAdmin */, updatePto);

//DELETE SEGUN ID
router.delete("/:id"/* , middlewares.isAdmin */, deletePto);

//EXPORT MODULO ROUTER
module.exports = router;