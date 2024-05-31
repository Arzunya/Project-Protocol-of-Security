import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getDispositivoUm } from "@infra/db/postgresdb/log-repository/exibir-dispositivosUm";

export class LogDispositivoUmController implements Controller {
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = Number(httpRequest.params.id)

    if (!id) throw "Falta sequência do usuário!";

    const dispositivo = await getDispositivoUm(id);

    if (!dispositivo) {
      throw "Dispositivo não encontrado";
    }

    return ok(dispositivo);
  }
}
