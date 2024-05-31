import { Router } from "express";
import { adaptRoute } from "../../adapters/express-route-adapter";
import { makeLogDispositivosController } from "../../../main/factories/exibirDispositivos-controller";
import { makeLogDispositivoUmController } from "../../../main/factories/exibirDispositivoUm-controller";
import { makeDispositivosController } from "../../factories/dispositivos";
import { makeAlimentarDispositivosController } from "../../factories/alimentar-dispositivos-factory";
import { makeTransmitirUsuariosController } from "../../factories/transmitir-usuarios";
import { makeTirarFotoController } from "../../factories/tirar-foto";
import { makeDeletarDispositivoController } from "../../factories/deletar-dispositivo";
import { makeAttDispositivosController } from "../../factories/attdispositivos";
import { makeVerificarDispositivoUmController } from "../../../main/factories/VerificarDispositivoUm-controller";
import { makeReiniciarDispositivoController } from "../../../main/factories/ReiniciarDispositivo-controller";
import { makeLogDispositivosTipoController } from "../../../main/factories/exibirDispositivosTipo-controller";


export default (router: Router): void => {
  router.get("/dispositivos", adaptRoute(makeLogDispositivosController()));
  router.get("/dispositivo/:id", adaptRoute(makeLogDispositivoUmController()));
  router.get("/dispositivosTipo", adaptRoute(makeLogDispositivosTipoController()));
  router.post("/dispositivos", adaptRoute(makeDispositivosController()));
  router.post("/alimentar-dispositivos", adaptRoute(makeAlimentarDispositivosController()));
  router.post("/transmitir-usuarios", adaptRoute(makeTransmitirUsuariosController()));
  router.post("/foto", adaptRoute(makeTirarFotoController()));
  router.delete("/deletarDispositivo", adaptRoute(makeDeletarDispositivoController()));
  router.post("/attdispositivos", adaptRoute(makeAttDispositivosController()));
  router.get("/verificar/:id", adaptRoute(makeVerificarDispositivoUmController()));
  router.get("/reiniciar/:id", adaptRoute(makeReiniciarDispositivoController()));
};
