import { Controller } from "../../presentention/protocols";
import { DelAccountPostgreRepository } from '../../infra/db/postgresdb/account-repository/deletarConta'
import { DbDelAccount } from '../../data/usecase/del-account/db-del-account'
import { DeletarController } from '../../presentention/controllers/deletar/deletar'
import { DeleteControllerDecorator } from '../../main/decorators/deletar'

export const makeDeletarContaController = (): Controller => {

    const delAccountPostgreRepository = new DelAccountPostgreRepository()
    const dbDelAccount = new DbDelAccount(delAccountPostgreRepository)
    const deletarController = new DeletarController(dbDelAccount)
    return new DeleteControllerDecorator(deletarController)
}