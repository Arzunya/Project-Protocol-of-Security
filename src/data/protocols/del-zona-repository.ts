import { DeletarZonaModel, HttpResponse  } from "../../presentention/controllers/deletar-zona/deletarZona-protocol";

export interface DelZonaRepository {
    del (zonaDel: DeletarZonaModel): Promise<HttpResponse>
}
