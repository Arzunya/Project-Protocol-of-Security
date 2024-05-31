import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getUsuarioVarios } from "@infra/db/postgresdb/log-repository/exibir-tipos";

export class LogTiposController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const tipoUsuario = await getUsuarioVarios()

    if (!tipoUsuario) {
      throw "nenhum tipo encontrado";
    }

    return ok(tipoUsuario);
  }
}
