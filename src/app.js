import express from "express";
import session from "express-session";
import compression from "compression";
import MongoStore from "connect-mongo";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { passport } from "./middlewares/passport.js";
import { isAuthApi } from "./middlewares/auth.js";
import Error404Controller from "./controllers/error404Controller.js";
import config from "./config.js";
import authRouter from "./routes/authRouter.js";
import webServerRouter from "./routes/webServerRouter.js";
import apiRouter from "./routes/apiRouter.js";
import { logger } from "./logger/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const error404Controller = new Error404Controller();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use((req, res, next) => {
  logger.info(`[Request] '${req.baseUrl + req.path}' método [${req.method}]`);
  next();
});

app.use(express.static(path.join(__dirname, "public"))); // comentar si utilizo Nginx como servidor de recursos estáticos

app.use(
  session({
    store: MongoStore.create(config.session.mongoStoreOptions),
    ...config.session.options
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter.start());
app.use(webServerRouter.start());
app.use("/api", isAuthApi, apiRouter.start());

app.use("/api", error404Controller.getError404Api);

app.use(error404Controller.getError404Web);

export default app;