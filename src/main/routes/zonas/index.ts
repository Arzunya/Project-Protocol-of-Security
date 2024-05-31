import { Router } from "express";
import { adaptRoute } from "../../adapters/express-route-adapter";
import { makeZonaController } from "../../factories/zonas";
import { makeZonaLogController } from "../../factories/logZonas";
import { makeZonaLogUmController } from "../../factories/logZonaUm";
import { makeDeletarZonaController } from "../../factories/deletarZona";
import { makeAttZonaController } from "../../factories/attzonas";

export default (router: Router): void => {
  router.post("/zonas", adaptRoute(makeZonaController()));
  router.get("/logzonas", adaptRoute(makeZonaLogController()));
  router.get("/logzonas/:id", adaptRoute(makeZonaLogUmController()));
  router.delete("/deletarZona", adaptRoute(makeDeletarZonaController()));
  router.post("/attzonas", adaptRoute(makeAttZonaController()));
};
