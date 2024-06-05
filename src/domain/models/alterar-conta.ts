export interface AltAccountModel {
  id: number;
  matricula: string | null;
  nome: string | null;
  senha: string | null;
  setor: string | null;
  documento: string | null;
  responsavel: string | null;
  email: string | null;
  observacoes: string | null;
  empresa: string | null;
  PhotoData: string | null;
  tipo: number;
  status: number;
  ValidFrom: string;
  ValidTo: string;
  nivel_usuario?: number[];

}
