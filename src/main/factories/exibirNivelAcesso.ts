import { Controller } from "../../presentention/protocols";
import { LogNivelAcessoController } from "../../presentention/controllers/log/nivelAcesso";
import { NivelAcessoControllerDecorator } from "../decorators/exibir-nivelAcesso";

export const makeLogNivelAcessoController = (): Controller => {
  const nivelAcessoController = new LogNivelAcessoController();
  return new NivelAcessoControllerDecorator(nivelAcessoController);
};
