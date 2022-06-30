import ProductsService from "./services/productosService.js";
import MessagesService from "./services/messagesService.js";
import ValidateDataService from "./services/validateDataService.js";
import { logger } from "./logger/index.js";

const productsService = new ProductsService();
const messagesService = new MessagesService();
const validateDataService = new ValidateDataService();

export default io => {
  io.on("connection", async socket => {
    const socketId = socket.id;
    //let now = new Date().toLocaleTimeString();
    logger.debug(
      `Cliente socket conectado con id: ${socketId}\n** Conexiones websocket activas: ${io.engine.clientsCount} **`
    );

    try {
      const list = await productsService.getAllProducts();
      socket.emit("allProducts", list);
    } catch (error) {
      logger.error(error);
      socket.emit("productErrors", "No se pudo recuperar archivo de productos");
    }

    try {
      const normalizedMessages = await messagesService.getAllMessages();
      socket.emit("allMessages", normalizedMessages);
    } catch (error) {
      logger.error(error);
      socket.emit("messageErrors", "No se pudo recuperar archivo de mensajes");
    }

    socket.on("saveProduct", async product => {
      try {
        const newProduct = validateDataService.validatePostProductBody(product);
        if (newProduct && !newProduct.error) {
          await productsService.createProduct(newProduct);
          const list = await productsService.getAllProducts();
          io.sockets.emit("allProducts", list);
        } else {
          socket.emit("productErrors", "Los valores enviados no son válidos");
        }
      } catch (error) {
        logger.error(error);
        socket.emit("productErrors", "No se pudo agregar el producto");
      }
    });

    socket.on("newMessage", async message => {
      try {
        const newMessage = validateDataService.validateMessage(message);
        if (newMessage && !newMessage.error) {
          await messagesService.createMessage(message);
          const normalizedMessages = await messagesService.getAllMessages();
          io.sockets.emit("allMessages", normalizedMessages);
        } else {
          socket.emit("messageErrors", "Los valores enviados no son válidos");
        }
      } catch (error) {
        logger.error(error);
        socket.emit("messageErrors", "Error al procesar el mensaje enviado");
      }
    });

    socket.on("disconnect", () => {
      //now = new Date().toLocaleTimeString();
      logger.debug(
        `** Conexiones websocket activas: ${io.engine.clientsCount} **`
      );
      //io.sockets.emit("usersCount", io.engine.clientsCount);
    });
  });

  setInterval(() => {
    io.sockets.emit("usersCount", io.engine.clientsCount);
  }, 3000);
};