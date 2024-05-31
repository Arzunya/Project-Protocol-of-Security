import { HttpRequest, HttpResponse } from "../../protocols";
import { serverError, ok, badRequest } from "../../helpers/http-helper";
import { alimentarDispositivosComPhotoDataPorIP } from "../../../infra/db/postgresdb/dispositivos-respository/alimentarDispositivosComPhotoDataPorIP";

export class AlimentarDispositivosController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { idAcesso } = httpRequest.body;

    if (!idAcesso) {
      throw "O nível de acesso é obrigatório.";
    }

    await alimentarDispositivosComPhotoDataPorIP(idAcesso);

    return ok({ message: "Operação realizada com sucesso" });
  }
}
