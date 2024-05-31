import { DelDispoAcessoModel } from "@domain/usecases/del-DispoAcesso";
import { HttpResponse } from "../../presentention/controllers/deletarDispositivo/deletarDispositivo-protocol";

export interface DelDispoAcessoRepository {
  del(perfil: DelDispoAcessoModel): Promise<HttpResponse>;
}
