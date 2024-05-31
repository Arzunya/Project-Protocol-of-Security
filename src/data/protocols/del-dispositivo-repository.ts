import { DelDispositivoModel, DeletarDispositivoModel, HttpResponse  } from "../../presentention/controllers/deletarDispositivo/deletarDispositivo-protocol";

export interface DelDispositivoRepository {
    del (dispositivoDel: DeletarDispositivoModel): Promise<HttpResponse>
}
