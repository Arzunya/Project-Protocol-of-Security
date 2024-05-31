import { Controller } from "../../presentention/protocols";
import { LogUsuarioVariosController } from "../../presentention/controllers/log/usuariosVarios";
import { UsuarioControllerDecorator } from "../decorators/exibir-usuarios";

export const makeLogUsuarioVariosController = (): Controller => {
  const usuariosVariosController = new LogUsuarioVariosController();
  return new UsuarioControllerDecorator(usuariosVariosController);
};
