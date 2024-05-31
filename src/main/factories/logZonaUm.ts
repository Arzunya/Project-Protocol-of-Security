import { Controller } from "../../presentention/protocols";
import { LogZonaUmController } from "../../presentention/controllers/log/logZonaUm";
import { LogZonaControllerDecorator } from "../decorators/logZona";

export const makeZonaLogUmController = (): Controller => {
  const logZonaUmController = new LogZonaUmController();
  return new LogZonaControllerDecorator(logZonaUmController);
};
