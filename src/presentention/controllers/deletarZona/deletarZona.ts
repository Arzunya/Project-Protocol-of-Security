import { HttpResponse, HttpRequest, Controller, DelZona } from "./deletarZona-protocols";


export class DeletarDispositivoController implements Controller {
  private readonly delZona: DelZona;

  constructor(delZona: DelZona) {
    this.delZona = delZona;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.body;

    const Zona = await this.delZona.del({
      id,
    });

    return Zona;
  }
}
