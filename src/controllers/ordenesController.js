const nodemailerConfig = require("../nodemailer-twilio/nodemailerConfig");
const twilioConfig = require("../nodemailer-twilio/twilioConfig");
const {
  getOrdenesService,
  createOrderService,
} = require("../services/ordenesService");

//Logs
const logs = require("../logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//GET TODAS LAS ORDENES
const getOrdenes = async (req, res) => {
  try {
    const response = await getOrdenesService();
    res.send(response);
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getOrdenes ordenesController");
  }
};

//POST GENERA NUEVA ORDEN SEGUN EL CARRITO
const createOrder = async (req, res) => {
  try {
    const { idCarrito } = req.params;
    const idUser = req.user.id;
    const response = await createOrderService(idCarrito, idUser);
    if (response.estado === "ok") {
      res.send(response.orden);
    } else if (response.estado === "carritoFalse") {
      res.status(400);
      res.send({ error: `Carrito con ID ${idCarrito} no existe` });
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createOrder ordenesController");
  }
};

//EXPORT MODULO ROUTER
module.exports = {
  getOrdenes,
  createOrder,
};