import { Controller } from "../../presentention/protocols";
import { VerificacaoDispositivoUmController } from "../../presentention/controllers/log/VerificacaoDispositivoUm";
import { DispositivoControllerDecorator } from "../decorators/exibir-dispositivos";

export const makeVerificarDispositivoUmController = (): Controller => {
  const verificacaoDispositivoUmController = new VerificacaoDispositivoUmController();
  return new DispositivoControllerDecorator(verificacaoDispositivoUmController);
};
