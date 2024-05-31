import { serverError, ok, badRequest } from "../../helpers/http-helper";
import { buscarUsuariosPorNivelEChamarAPI } from "@infra/db/postgresdb/account-repository/buscarUsuariosPorNivel";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class TransmitirUsuariosController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { idDispositivo } = httpRequest.body;

    // ZOD

    if (!idDispositivo) {
      throw "ID do dispositivo não encontrado";
    }

    const usuarios = await buscarUsuariosPorNivelEChamarAPI({ idDispositivo });
    console.log("Usuários encontrados:", usuarios);
    return ok(usuarios);
  }
}
