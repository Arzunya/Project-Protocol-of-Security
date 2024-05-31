import { Controller } from "../../presentention/protocols";
import { LogDispositivoUmController } from "../../presentention/controllers/log/dispositivoUm";
import { DispositivoControllerDecorator } from "../decorators/exibir-dispositivos";

export const makeLogDispositivoUmController = (): Controller => {
  const logDispositivoUmController = new LogDispositivoUmController();
  return new DispositivoControllerDecorator(logDispositivoUmController);
};
