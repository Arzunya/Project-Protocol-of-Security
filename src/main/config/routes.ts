import { Express, Router } from "express";
import usuario from "../routes/usuario";
import acesso from "../routes/acesso";
import dispositivo from "../routes/dispositivo";
import log from "../routes/log";
import zonas from "../routes/zonas";
import servidorEventos from "../routes/log/log-routes";
import veiculo from "../routes/veiculo";


export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  usuario(router);
  acesso(router);
  dispositivo(router);
  log(router);
  zonas(router);
  servidorEventos(router);
  veiculo(router);
};
