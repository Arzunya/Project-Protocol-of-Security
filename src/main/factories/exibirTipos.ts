import { Controller } from "../../presentention/protocols";
import { LogTiposController } from "../../presentention/controllers/log/logTipos";
import { UsuarioControllerDecorator } from "../decorators/exibir-usuarios";

export const makeLogTiposController = (): Controller => {
  const logTiposController = new LogTiposController();
  return new UsuarioControllerDecorator(logTiposController);
};
