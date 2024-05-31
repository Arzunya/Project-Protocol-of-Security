import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { getLogZonaUm } from "@infra/db/postgresdb/log-repository/exibir-logZonaUm";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LogZonaUmController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = Number(httpRequest.params.id);

    if (!id) throw "Falta sequência da Zona!";

    const logZonaUm = await getLogZonaUm(id);

    if (!logZonaUm) {
      throw "Zona não encontrada";
    }

    return ok(logZonaUm);
  }
}
