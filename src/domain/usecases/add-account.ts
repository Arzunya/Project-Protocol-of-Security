import { AccountModel } from "../models/account";

export interface AddAccountModel {
  tipo: number;
  matricula: string;
  nome: string;
  senha: string;
  setor: string;
  documento: string;
  responsavel: string;
  email: string;
  observacoes: string;
  empresa: string;
  nivel_usuario: string;
  PhotoData: string;
  status: number;
  ValidFrom: string;
  ValidTo: string;
  acessos: number[];
  veiculo: number[];  // Corrigido aqui

  
  
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
