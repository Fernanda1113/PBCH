const {
    createCarritoService,
    addPtoToCarritoService,
    deleteCarritoService,
    deletePtoFromCarritoService,
    getPtosFromCarritoService,
    getCarritosService,
  } = require("../services/carritoService");
  
  //Logs
  const logs = require("../logs/loggers");
  const loggerConsola = logs.getLogger("consola");
  const loggerError = logs.getLogger("error");
  
  //POST VACIO CREA UN NUEVO CARRITO
  const createCarrito = async (req, res) => {
    try {
      let idCarrito = await createCarritoService();
      res.send(idCarrito);
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en createCarrito carritoController");
    }
  };
  
  //POST CON ID DE PTO
  const addPtoToCarrito = async (req, res) => {
    try {
      const { idPto, idCarrito } = req.params;
      const response = await addPtoToCarritoService(idPto, idCarrito);
      if (response.estado === "ok") {
        res.send(response.carrito);
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${idCarrito} no existe` });
      } else if (response.estado === "ptoFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${idPto} no existe` });
      }
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en addPtoToCarrito carritoController");
    }
  };
  
  //DELETE CARRITO SEGUN ID
  const deleteCarrito = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await deleteCarritoService(id);
      if (response.estado === "ok") {
        res.send({ message: `Carrito con ID ${id} borrado` });
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${id} no existe` });
      }
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en deleteCarrito carritoController");
    }
  };
  
  //DELETE DE UN PRODUCTO DE UN CARRITO SEGUN ID
  const deletePtoFromCarrito = async (req, res) => {
    try {
      const { idPto, idCarrito } = req.params;
      const response = await deletePtoFromCarritoService(idPto, idCarrito);
      if (response.estado === "ok") {
        res.send(response.carrito);
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${idCarrito} no existe` });
      } else if (response.estado === "ptoFalse") {
        res.status(400);
        res.send({ error: `Producto con ID ${idPto} no existe` });
      }
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en deletePtoFromCarrito carritoController");
    }
  };
  
  //GET PRODUCTOS EN CARRITO POR ID
  const getPtosFromCarrito = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await getPtosFromCarritoService(id);
  
      if (response.estado === "ok") {
        res.send(response.products);
      } else if (response.estado === "carritoFalse") {
        res.status(400);
        res.send({ error: `Carrito con ID ${id} no existe` });
      }
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en getPtosFromCarrito carritoController");
    }
  };
  
  //GET TODOS LOS CARRITOS
  const getCarritos = async (req, res) => {
    try {
      const response = await getCarritosService();
      res.send(response);
    } catch (error) {
      loggerError.error(error);
      throw Error("Error en getCarritos carritoController");
    }
  };
  
  //EXPORT MODULO ROUTER
  module.exports = {
    createCarrito,
    addPtoToCarrito,
    deleteCarrito,
    deletePtoFromCarrito,
    getPtosFromCarrito,
    getCarritos,
  };
  