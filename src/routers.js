import Router from "@koa/router";
import GeneratorColor from "./controllers/color.js";

const router = new Router()

router.get('/open-api/color', GeneratorColor.generatorColor)

export default router