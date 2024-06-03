import { Router } from "express";
import { adaptRoute } from "../../adapters/express-route-adapter";
import { makeLogasController } from "../../factories/log-controller";
import { makeLogNotificacaoController } from "../../factories/logNotificacao-controller";
import { makeLogVeiculoController } from "../../factories/logVeiculo";
import { makeHistoricoController } from "../../factories/logHistorico-controller";



export default (router: Router): void => {
  router.get("/logs", adaptRoute(makeLogasController()));
  router.get("/logNotificacao", adaptRoute(makeLogNotificacaoController()));
  router.get("/logVeiculo", adaptRoute(makeLogVeiculoController()));
  router.get("/logHistorico/:id", adaptRoute(makeHistoricoController()))
};

