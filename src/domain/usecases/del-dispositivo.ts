import { HttpResponse } from "../../presentention/protocols";
import { DeletarDispositivoModel } from "../models/deletarDispositivo";

export interface DelDispositivoModel {
  id: number;
}

export interface DelDispositivo {
  del(dispositivoDel: DeletarDispositivoModel): Promise<HttpResponse>;
}
