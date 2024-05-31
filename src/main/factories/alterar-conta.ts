import { Controller } from '../../presentention/protocols';
import { AltAccountPostgreRepository } from '../../infra/db/postgresdb/account-repository/atualizarConta';
import { DbAttAccount } from '../../data/usecase/att-account/db-att-account';
import { AtualizarController} from '../../presentention/controllers/atualizar/atualizar'
import { AtualizarControllerDecorator } from '../../main/decorators/atualizar'

export const makeAlterarContaController = (): Controller => {
    
    const altAccountPostgreRepository = new AltAccountPostgreRepository()
    const dbAttAccount = new DbAttAccount(altAccountPostgreRepository)
    const atualizarController = new AtualizarController(dbAttAccount)
    return new AtualizarControllerDecorator(atualizarController)

    

}