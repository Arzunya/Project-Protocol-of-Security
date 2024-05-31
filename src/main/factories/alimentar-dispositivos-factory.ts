import { Controller } from "../../presentention/protocols";
import { AlimentarDispositivosController } from "../../presentention/controllers/transmitir-usuarios/alimentar-dispositivos-controller";
import { AlimentarControllerDecorator } from "../decorators/alimentar"
export const makeAlimentarDispositivosController = (): Controller => {
  const alimentarDispositivosController = new AlimentarDispositivosController();
  return new AlimentarControllerDecorator(alimentarDispositivosController)
};
