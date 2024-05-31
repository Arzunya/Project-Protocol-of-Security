import { HttpResponse, HttpRequest, Controller, DelDispositivo } from "./deletarDispositivo-protocol";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { PrismaClient } from "@prisma/client";

export class DeletarDispositivoController implements Controller {
  private readonly delDispositivo: DelDispositivo;

  constructor(delDispositivo: DelDispositivo) {
    this.delDispositivo = delDispositivo;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.body;

    const dispositivo = await this.delDispositivo.del({
      id,
    });

    return dispositivo;
  }
}
