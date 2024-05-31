import { PerfilAcessoModel } from "../models/perfilAcesso";

export interface AddPerfilAcessoModel {
  id: number;
  nivel: string;
  dispositivos: number[];
}

export interface AddPerfilAcesso {
  add(perfil: AddPerfilAcessoModel): Promise<PerfilAcessoModel>;
}
