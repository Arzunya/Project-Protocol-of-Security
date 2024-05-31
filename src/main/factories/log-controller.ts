import { DispositivosPosgresRepository } from "@infra/db/postgresdb/dispositivos-respository/dispositivos";
import { Controller } from "../../presentention/protocols";
import { getLog } from "@infra/db/postgresdb/log-repository/exibir-log";
import { DispositivosController } from "../../presentention/controllers/dispositivos/dispositivos";
import { LogController } from "../../presentention/controllers/log/logs";
import { LogControllerDecorator } from "../decorators/log";

export const makeLogasController = (): Controller => {
  const dispositivosController = new LogController();
  return new LogControllerDecorator(dispositivosController);
};
