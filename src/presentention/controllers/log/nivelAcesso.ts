import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getNiveis } from "@infra/db/postgresdb/log-repository/exibir-nivelAcesso";

export class LogNivelAcessoController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const niveis = await getNiveis();

    return ok(niveis);
  }
}
