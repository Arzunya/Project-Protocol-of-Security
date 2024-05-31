import { Router } from "express";
import { adaptRoute } from "../../adapters/express-route-adapter";
import { makeLogNivelAcessoController } from "../../../main/factories/exibirNivelAcesso";
import { makePerfilAcessoController } from "../../factories/perfilAcesso";
import { makeLogNivelAcessoUmController } from "../../../main/factories/exibirNivelAcessoUm";
import { makeDeletarPerfilController } from "../../factories/deletar-perfilAcesso";
import { makeDeletarDispoAcessoController } from "../../factories/deletar-dispositivo-acesso";
import { makeAttZonaController } from "../../factories/attPerfilAcesso";


export default (router: Router): void => {
  router.get("/niveisacesso", adaptRoute(makeLogNivelAcessoController()));
  router.get("/niveisacesso/:id", adaptRoute(makeLogNivelAcessoUmController()));
  router.post("/nivelacesso", adaptRoute(makePerfilAcessoController()));
  router.post("/nivelacesso", adaptRoute(makePerfilAcessoController()));
  router.delete("/delnivelacesso", adaptRoute(makeDeletarPerfilController()));
  router.delete("/delDispositivoAcesso", adaptRoute(makeDeletarDispoAcessoController()));
  router.post("/attnivelacesso", adaptRoute(makeAttZonaController()));

  

};
