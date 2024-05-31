import { CadastroPerfilAcessoController } from "../../presentention/controllers/cadastro-perfilAcesso/cadastro-perfilAcesso"
import { DbAddPerfilAcesso } from "../../data/usecase/add-perfilAcesso/db-add-perfilAcesso"
import { PerfilAcessoPostgreRepository } from "../../infra/db/postgresdb/perfilAcesso-repository/perfilAcesso"
import { LogControllerDecorator } from "../decorators/log"
import { Controller } from "../../presentention/protocols"

export const makePerfilAcessoController = (): Controller => {

    const perfilAcessoPostgreRepository = new PerfilAcessoPostgreRepository()
    const dbAddPerfilAcesso = new DbAddPerfilAcesso(perfilAcessoPostgreRepository)
    const cadastroPerfilAcessoController = new CadastroPerfilAcessoController(dbAddPerfilAcesso)
    return new LogControllerDecorator(cadastroPerfilAcessoController)
}