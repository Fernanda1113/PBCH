const {
    getPtosService,
    getPtoIdService,
    createPtoService,
    updatePtoService,
    deletePtoService,
  } = require("../services/productosService");
  
  //Logs
  const logs = require("../logs/loggers");
  const loggerConsola = logs.getLogger("consola");
  const loggerError = logs.getLogger("error");
  
  //FECHA
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
  
  //GET TODOS LOS PRODUCTOS
  const getPtos = async (req, res) => {
    try {
      const response = await getPtosService();
      res.send(response);
    } catch (error) {
      throw Error("Error en getPtos productosController");
    }
  };
  
  //GET PRODUCTO POR ID
  const getPtoId = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await getPtoIdService(id);
      if (response.estado === "ok") {
        res.send(response.producto);
      } else if (response.estado === "ptoFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${id} no existe` });
      }
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en getPtoId productosController");
    }
  };
  
  //POST CON PTO NUEVO ENVIADO POR PARAMETRO
  const createPto = async (req, res) => {
    try {
      //Armo un nuevo PTO con los datos recibidos por parametro y datos locales como fecha
      const { nombre, descripcion, codigo, thumbail, precio, stock } = req.body;
      const newObj = {
        timestamp: darFecha(),
        nombre,
        descripcion,
        codigo,
        thumbail,
        precio,
        stock,
      };
      const response = await createPtoService(newObj);
      res.send(response);
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en createPto productosController");
    }
  };
  
  //PUT MODIFICANDO SEGUN ID
  const updatePto = async (req, res) => {
    try {
      //Armo un nuevo PTO con los datos recibidos por parametro
      const { nombre, descripcion, codigo, thumbail, precio, stock } = req.body;
      const { id } = req.params;
      const ptoMod = {
        id,
        timestamp: darFecha(),
        nombre,
        descripcion,
        codigo,
        thumbail,
        precio,
        stock,
      };
      const response = await updatePtoService(ptoMod, id);
      if (response.estado === "ok") {
        res.send(response.producto);
      } else if (response.estado === "ptoFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${id} no existe` });
      }
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en updatePto productosController");
    }
  };
  
  //DELETE SEGUN ID
  const deletePto = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await deletePtoService(id);
      if (response.estado === "ok") {
        res.send(response.productos);
      } else if (response.estado === "ptoFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${id} no existe` });
      }
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en deletePto productosController");
    }
  };
  
  //EXPORT MODULO ROUTER
  module.exports = {
    getPtos,
    getPtoId,
    createPto,
    updatePto,
    deletePto,
  };
  