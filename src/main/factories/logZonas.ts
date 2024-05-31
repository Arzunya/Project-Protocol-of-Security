import { Controller } from "../../presentention/protocols";
import { LogZonaController } from "../../presentention/controllers/log/logZonas";
import { LogZonaControllerDecorator } from "../decorators/logZona";

export const makeZonaLogController = (): Controller => {
  const logZonasController = new LogZonaController();
  return new LogZonaControllerDecorator(logZonasController);
};
