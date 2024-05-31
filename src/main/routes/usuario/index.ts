import { Router } from "express";
import { adaptRoute } from "../../adapters/express-route-adapter";
import { makeDeletarContaController } from "../../factories/deletar-conta";
import { makeAlterarContaController } from "../../factories/alterar-conta";
import { makeLogUsuarioController } from "../../factories/exibirUsuario-controller";
import { makeSignupController } from "../../factories/signup";
import { makeLogUsuarioVariosController } from "../../factories/exibirUsuarioVarios-controller";
import { makeLogTiposController } from "../../factories/exibirTipos";

export default function (router: Router): void {
  router.post("/signup", adaptRoute(makeSignupController()));
  router.delete("/deletar", adaptRoute(makeDeletarContaController()));
  router.post("/atualizar", adaptRoute(makeAlterarContaController()));
  router.get("/usuario/:id", adaptRoute(makeLogUsuarioController()));
  router.get("/usuario", adaptRoute(makeLogUsuarioVariosController()));
  router.get("/tipos", adaptRoute(makeLogTiposController()));
}
