import { Controller } from "../../presentention/protocols"
import { AtualizarPerfilAcessoPostgreRepository } from "../../infra/db/postgresdb/perfilAcesso-repository/atualizarPerfil"
import { DbAddPerfilAcesso } from "../../data/usecase/add-perfilAcesso/db-add-perfilAcesso"
import { AtualizarPerfilAcessoController } from "../../presentention/controllers/cadastro-perfilAcesso/atualizar-perfilAcesso"
import { NivelAcessoControllerDecorator } from "../decorators/exibir-nivelAcesso"

export const makeAttZonaController = (): Controller => {

    const atualizarPerfilAcessoPostgreRepository = new AtualizarPerfilAcessoPostgreRepository()
    const dbAddPerfilAcesso = new DbAddPerfilAcesso(atualizarPerfilAcessoPostgreRepository)
    const atualizarPerfilAcessoController = new AtualizarPerfilAcessoController(dbAddPerfilAcesso)
    return new NivelAcessoControllerDecorator(atualizarPerfilAcessoController)
}