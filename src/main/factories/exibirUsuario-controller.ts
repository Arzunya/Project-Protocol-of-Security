import { Controller } from "../../presentention/protocols";
import { LogUsuarioController } from "../../presentention/controllers/log/usuarios";
import { UsuarioControllerDecorator } from "../decorators/exibir-usuarios";

export const makeLogUsuarioController = (): Controller => {
  const usuarioController = new LogUsuarioController();
  return new UsuarioControllerDecorator(usuarioController);
};
