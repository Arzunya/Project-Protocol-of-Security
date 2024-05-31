import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getDispositivoUm } from "@infra/db/postgresdb/log-repository/exibir-dispositivosUm";
import { IntelbrasReiniciar } from "../../../infra/intelbras/controllers/user/reiniciar/reiniciar";

export class ReiniciarDispositivoUmController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = Number(httpRequest.params.id);

      if (!id) throw "Falta o id!";

      // Obter o dispositivo do banco de dados
      const dispositivo = await getDispositivoUm(id);

      if (!dispositivo) {
        throw "Dispositivo não encontrado";
      }

      // Extrair o IP do dispositivo obtido do banco de dados
      const { ip } = dispositivo;
      let ipString: string;

      if (ip !== null) {
        ipString = ip;
      } else {
        throw ("IP do dispositivo é nulo.");
      }

      // Fazer a solicitação à API externa usando o IP do dispositivo
      const intelbrasReiniciar = new IntelbrasReiniciar();
      const respostaApi = await intelbrasReiniciar.get(ipString);
      // Retornar a resposta da API externa
      return ok(respostaApi);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      return serverError();
    }
  }
}
