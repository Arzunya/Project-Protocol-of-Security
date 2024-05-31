import { Controller } from "../../presentention/protocols";
import { DeletarPerfilAcessoController } from '../../presentention/controllers/deletar-acesso/deletarAcesso'
import { DeletePerfilAcessoControllerDecorator } from '../decorators/deletarPerfilAcesso'
import { DelAcessoPostgreRepository } from '../../infra/db/postgresdb/perfilAcesso-repository/deletarAcesso'
import { DbDelPerfilAcesso } from '../../data/usecase/add-perfilAcesso/db-del-perfilAcesso'




export const makeDeletarPerfilController = (): Controller => {

    const delAcessoPostgreRepository = new DelAcessoPostgreRepository()
    const dbDelPerfilAcesso = new DbDelPerfilAcesso(delAcessoPostgreRepository)
    const deletarPerfilAcessoController = new DeletarPerfilAcessoController(dbDelPerfilAcesso)
    return new DeletePerfilAcessoControllerDecorator(deletarPerfilAcessoController)
}