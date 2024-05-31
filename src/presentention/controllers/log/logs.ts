import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { getLog } from "@infra/db/postgresdb/log-repository/exibir-log";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LogController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const logs = await getLog();

    return ok(logs);
  }
}
