import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { getNotificacao } from "@infra/db/postgresdb/log-repository/exibir-notificacao";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class NotificacaoController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const notificacao = await getNotificacao();

    return ok(notificacao);
  }
}
