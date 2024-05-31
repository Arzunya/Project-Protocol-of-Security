import { PerfilAcessoModel } from "../models/perfilAcesso";
import { HttpResponse } from "../../presentention/protocols";

export interface DelPerfilAcessoModel {
  id: number;
  nivel: string;
}

export interface DelPerfilAcesso {
  del(perfil: DelPerfilAcessoModel): Promise<HttpResponse>;
}
