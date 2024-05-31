export interface AccountModel {
  id: number;
  matricula: string | null;
  nome: string | null;
  senha: string | null;
  setor: string | null;
  documento: string | null;
  responsavel: string | null;
  email: string | null;
  observacoes: string | null;
  situacaoCadastro: string | null;
  empresa: string | null;
  tipo: number;
  status: number;
  ValidFrom: string;
  ValidTo: string;
  nivelAcesso?: { id: number; nivel: string }[];
  dispositivos?: { id: number; ip: string | null }[];
}
