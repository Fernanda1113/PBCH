import { createRouter } from "../deps.ts";
import * as colorsController from "../controllers/colors.controller.tsx";

const router = createRouter();

router.get("/", colorsController.getHome);

router.post("/", colorsController.postColor);

export default router;