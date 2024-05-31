import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { getNiveisUm } from "@infra/db/postgresdb/log-repository/exibir-nivelAcessoUm";

export class LogNivelAcessoUmController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = Number(httpRequest.params.id);

    console.log('oi?')

    if (!id) throw "Falta sequência do usuário!";
    
    const niveis = await getNiveisUm(id);

    if (!niveis) {
        throw "Nivel não encontrado";
    }

    return ok(niveis);
  }
}
