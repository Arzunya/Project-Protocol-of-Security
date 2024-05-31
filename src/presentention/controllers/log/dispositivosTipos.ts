import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getDispositivosTipo } from "@infra/db/postgresdb/log-repository/exibir-dispositivosPorTipo";

export class LogDispositivosTiposController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const dispositivos = await getDispositivosTipo();

    return ok(dispositivos);
  }
}
