import { Server as Httpserver } from "http";
import cluster from "cluster";
import { Server as IoServer } from "socket.io";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import config from "./config.js";
import { logger } from "./logger/index.js";

const MODE = config.MODE;

async function startServer() {
  const { default: app } = await import("./app.js");
  const { default: sockets } = await import("./sockets.js");

  const PORT = config.PORT;

  const httpServer = new Httpserver(app.callback());
  const io = new IoServer(httpServer);

  MODE === "CLUSTER" && io.adapter(createAdapter());

  sockets(io);

  httpServer
    .listen(PORT, () =>
      logger.info(
        `Servidor http con websockets escuchando en el puerto ${
          httpServer.address().port
        }`
      )
    )
    .on("error", error => {
      logger.error(`Ocurrió un error en el servidor: ${error}`);
      process.exit(1);
    });
}

cluster.isPrimary &&
  logger.info(
    `>>>> Entorno: [${config.NODE_ENV}] <<<< >>>> GRAPHIQL: [${config.GRAPHIQL}] <<<<`
  );

MODE !== "CLUSTER" &&
  process.on("exit", code => {
    logger.info(`Salida del proceso con código de error: ${code}`);
  });

if (MODE === "CLUSTER" && cluster.isPrimary) {
  logger.info(`Proceso Master iniciado con PID ${process.pid}`);
  logger.info(`Número de procesadores: ${config.numCPUs}`);

  setupPrimary();

  for (let i = 0; i < config.numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.warn(
      `Worker con PID ${worker.process.pid} terminado - signal/code:[${
        signal || code
      }]`
    );
    cluster.fork();
  });
} else startServer();