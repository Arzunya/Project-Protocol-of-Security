import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getUsuario } from "@infra/db/postgresdb/log-repository/exibir-usuario";

export class LogUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = Number(httpRequest.params.id);

    if (!id) throw "Falta sequência do usuário!";

    const usuario = await getUsuario(id);

    if (!usuario) {
      throw "Usuário não encontrado";
    }

    return ok(usuario);
  }
}
//apenas testando
