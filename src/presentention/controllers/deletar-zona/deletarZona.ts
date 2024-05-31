import { HttpResponse, HttpRequest, Controller, DelZona } from "./deletarZona-protocol";

export class DeletarZonaController implements Controller {
  private readonly delZona: DelZona;

  constructor(delZona: DelZona) {
    this.delZona = delZona;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.body;

    const zona = await this.delZona.del({
      id,
    });

    return zona;
  }
}
