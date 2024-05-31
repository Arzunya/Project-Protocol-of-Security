import { HttpResponse } from "../../presentention/protocols";
import { DeletarZonaModel } from "../models/deletarZona";

export interface DelZonaModel {
  id: number;
}

export interface DelZona {
  del(zonaDel: DeletarZonaModel): Promise<HttpResponse>;
}
