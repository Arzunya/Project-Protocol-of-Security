import { LogControllerDecorator } from "../decorators/log";
import { Controller } from "../../presentention/protocols";
import { TransmitirUsuariosController } from "../../presentention/controllers/transmitir-usuarios/transmitir-usuarios";

export const makeTransmitirUsuariosController = (): Controller => {
  const transmitirUsuariosController = new TransmitirUsuariosController();
  return new LogControllerDecorator(transmitirUsuariosController);
};
