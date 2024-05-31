import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { getLogHistorico } from "@infra/db/postgresdb/log-repository/exibir-logHistorico";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LogHistoricoController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = Number(httpRequest.params.id);

    if (!id) throw "Falta sequencia do usuário!"

    const historico = await (getLogHistorico);

    if (!historico) {
      throw "Usuário não encontrado"
    }

    return ok(historico);
  }
}
