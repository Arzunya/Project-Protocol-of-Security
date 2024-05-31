import { Controller } from "../../presentention/protocols";
import { LogHistoricoController } from "../../presentention/controllers/log/logsHistorico";
import { LogControllerDecorator } from "../decorators/log";

export const makeHistoricoController = (): Controller => {
  const dispositivosController = new LogHistoricoController();
  return new LogControllerDecorator(dispositivosController);
};
