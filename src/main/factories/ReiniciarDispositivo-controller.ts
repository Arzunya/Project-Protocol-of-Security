import { Controller } from "../../presentention/protocols";
import { ReiniciarDispositivoUmController } from "../../presentention/controllers/log/ReiniciarDispositivo";
import { DispositivoControllerDecorator } from "../decorators/exibir-dispositivos";

export const makeReiniciarDispositivoController = (): Controller => {
  const reiniciarDispositivoUmController = new ReiniciarDispositivoUmController();
  return new DispositivoControllerDecorator(reiniciarDispositivoUmController);
};
