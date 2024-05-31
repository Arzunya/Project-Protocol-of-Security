import { Controller } from "../../presentention/protocols";
import { NotificacaoController } from "../../presentention/controllers/log/notificacao";
import { LogControllerDecorator } from "../decorators/log";

export const makeLogNotificacaoController = (): Controller => {
  const dispositivosController = new NotificacaoController();
  return new LogControllerDecorator(dispositivosController);
};
