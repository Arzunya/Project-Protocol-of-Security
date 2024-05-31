import { DeletarDispoAcessoModel } from "../models/deletarDispoAcesso";
import { HttpResponse } from "../../presentention/protocols";

export interface DelDispoAcessoModel {
  id: number
  nivelId: number;
  dispositivoId: number;
}

export interface DelDispoAcesso {
  del(perfil: DelDispoAcessoModel): Promise<HttpResponse>;
}

