import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { getLogZonas } from "@infra/db/postgresdb/log-repository/exibir-logZonas";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LogZonaController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const logsZona = await getLogZonas();

    return ok(logsZona);
  }
}
