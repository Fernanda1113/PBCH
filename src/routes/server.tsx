import { createApp, config } from "./deps.ts";
import colorsRouter from "./routes/colors.router.ts";

const PORT = Number(config().PORT) || 8080;

const app = createApp();

app.route("/", colorsRouter);

app.listen({ port: PORT });
console.log(`Servidor Deno corriendo en puerto ${PORT}`);