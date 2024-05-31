import { Controller } from "../../presentention/protocols";
import { LogDispositivosTiposController } from "../../presentention/controllers/log/dispositivosTipos";
import { DispositivoControllerDecorator } from "../decorators/exibir-dispositivos";

export const makeLogDispositivosTipoController = (): Controller => {
  const logDispositivosTiposController = new LogDispositivosTiposController();
  return new DispositivoControllerDecorator(logDispositivosTiposController);
};
