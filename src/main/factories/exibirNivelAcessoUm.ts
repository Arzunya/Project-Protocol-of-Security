import { Controller } from "../../presentention/protocols";
import { LogNivelAcessoUmController } from "../../presentention/controllers/log/nivelAcessoUm";
import { NivelAcessoControllerDecorator } from "../decorators/exibir-nivelAcesso";

export const makeLogNivelAcessoUmController = (): Controller => {
  const nivelAcessoUmController = new LogNivelAcessoUmController();
  return new NivelAcessoControllerDecorator(nivelAcessoUmController);
};
