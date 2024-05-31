import { Controller } from "../../presentention/protocols";
import { LogDispositivosController } from "../../presentention/controllers/log/dispositivos";
import { DispositivoControllerDecorator } from "../decorators/exibir-dispositivos";

export const makeLogDispositivosController = (): Controller => {
  const logDispositivosController = new LogDispositivosController();
  return new DispositivoControllerDecorator(logDispositivosController);
};
