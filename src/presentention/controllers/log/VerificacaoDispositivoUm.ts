import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getDispositivoUm } from "@infra/db/postgresdb/log-repository/exibir-dispositivosUm";
import { IntelbrasInfo } from "../../../infra/intelbras/controllers/user/verificacao/verificacao";

export class VerificacaoDispositivoUmController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = Number(httpRequest.params.id);

      if (!id) throw "Falta sequência do usuário!";

      const dispositivo = await getDispositivoUm(id);

      if (!dispositivo) {
        throw "Dispositivo não encontrado";
      }

      const { ip } = dispositivo;
      let ipString: string;

      if (ip !== null) {
        ipString = ip;
      } else {
        throw ("IP do dispositivo é nulo.");
      }

      const intelbrasInfo = new IntelbrasInfo();
      const respostaApi = await intelbrasInfo.get(ipString);
      
      return ok(respostaApi);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      return serverError();
    }
  }
}
