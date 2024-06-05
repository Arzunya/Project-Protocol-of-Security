import { Router } from "express";
import { adaptRoute } from "../../adapters/express-route-adapter";
import { makeVeiculoController } from "../../factories/veiculos";
import { makeDeletarVeiculoController } from "../../factories/delveiculos";
import { makeAttVeiculoController } from "../../factories/attVeiculos";
import { makeLogVeiculoController } from "../../factories/logVeiculo";

export default function (router: Router): void {
  router.post("/veiculo", adaptRoute(makeVeiculoController()));
  router.delete("/deletarveiculo", adaptRoute(makeDeletarVeiculoController()));
  router.post("/attveiculo", adaptRoute(makeAttVeiculoController()));
  router.get("/listarveiculo", adaptRoute(makeLogVeiculoController()));

}
