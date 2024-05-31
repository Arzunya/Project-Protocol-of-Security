import { AddPerfilAcessoModel, PerfilAcessoModel } from "../../presentention/controllers/cadastro-perfilAcesso/cadastro-perfilAcesso-protocols"

export interface AddPerfilAcessoRepository {
    add (PerfilAcessoData: AddPerfilAcessoModel): Promise<PerfilAcessoModel>
    
}