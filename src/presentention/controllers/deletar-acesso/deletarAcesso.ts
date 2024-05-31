import { HttpResponse, HttpRequest, Controller, DelPerfilAcesso,} from "./deletarAcesso-protocol";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { PrismaClient } from "@prisma/client";

export class DeletarPerfilAcessoController implements Controller {
  private readonly delPerfilAcesso: DelPerfilAcesso;

  constructor(delPerfilAcesso: DelPerfilAcesso) {
    this.delPerfilAcesso = delPerfilAcesso;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id, nivel } = httpRequest.body;

    const deletePerfilAcesso = await this.delPerfilAcesso.del({
      id,
      nivel
    });

    return deletePerfilAcesso;
  }
}
