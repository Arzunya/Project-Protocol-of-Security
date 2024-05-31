import { HttpResponse, HttpRequest, Controller, AltZona } from "./alterar-zona-protocol";


export class AlterarZonaController implements Controller {
  private readonly altZona: AltZona;

  constructor(altZona: AltZona) {
    this.altZona = altZona;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome } = httpRequest.body;

    const Zona = await this.altZona.alt({
      nome,
    });

    return Zona;
  }
}
