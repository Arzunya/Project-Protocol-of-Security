import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getDispositivos } from "@infra/db/postgresdb/log-repository/exibir-dispositivos";

export class LogDispositivosController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const dispositivos = await getDispositivos();

    return ok(dispositivos);
  }
}
