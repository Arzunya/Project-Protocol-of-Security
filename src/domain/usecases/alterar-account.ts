import { AltAccountModel } from "../models/alterar-conta";

export interface AttAccountModel {
  
  id: number;
  nome: string | null;
  senha: string | null;
  setor: string | null;
  documento: string | null;
  responsavel: string | null;
  email: string | null;
  observacoes: string | null;
  empresa: string | null;
  matricula: string | null;
  PhotoData: string | null;
  tipo: number;
  status: number;
  ValidFrom: string;
  ValidTo: string;
  nivel_usuario?: number[];
}

export interface AlterarAccount {
  alt(account: AltAccountModel): Promise<AltAccountModel>;
}
