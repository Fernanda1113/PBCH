const Daos = require("../models/daos/configDb");
const nodemailerConfig = require("../nodemailer-twilio/nodemailerConfig");
const twilioConfig = require("../nodemailer-twilio/twilioConfig");

//Logs
const logs = require("../logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//CLASE CONTENEDORA DE CARRITO Y PRODUCTO
let carros = Daos.carritos;
let ordenes = Daos.ordenes;

//FUNCION FECHA
function darFecha() {
  const fecha = new Date();
  let fechaOK =
    fecha.getDate() +
    "/" +
    (fecha.getMonth() + 1) +
    " - " +
    fecha.getHours() +
    ":" +
    fecha.getMinutes() +
    ":" +
    fecha.getSeconds();
  return fechaOK;
}

//GET TODAS LAS ORDENES
const getOrdenesService = async () => {
  try {
    const orders = ordenes.getAll();
    return orders;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getOrdenesService");
  }
};

//POST GENERA NUEVA ORDEN SEGUN EL CARRITO
const createOrderService = async (idCarrito, idUser) => {
  try {
    let carrito = await carros.getById(idCarrito);
    if (carrito) {
      const productos = carrito.productos;
      let newObj = {
        timestamp: darFecha(),
        user: idUser,
        productos,
      };
      await ordenes.save(newObj); 
      return { estado: "ok", orden: newObj };
    } else {
      return { estado: "carritoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createOrderService");
  }
};

//EXPORT MODULO ROUTER
module.exports = {
  getOrdenesService,
  createOrderService,
};