import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getUsuarioVarios } from "@infra/db/postgresdb/log-repository/exibir-usuarioVarios";

export class LogUsuarioVariosController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const usuariomuitos = await getUsuarioVarios()

    if (!usuariomuitos) {
      throw "nenhum usuario encontrado";
    }

    return ok(usuariomuitos);
  }
}
