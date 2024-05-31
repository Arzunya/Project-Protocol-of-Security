import { CadastroController } from "../../presentention/controllers/cadastro/cadastro"
import { DbAddAccount } from '../../data/usecase/add-account/db-add-account';
import { AccountPostgreRepository } from '../../infra/db/postgresdb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentention/protocols';


export const makeSignupController = (): Controller => {

    const accountPostgreRepository = new AccountPostgreRepository()
    const dbAddAccount = new DbAddAccount(accountPostgreRepository)
    const cadastroController = new CadastroController(dbAddAccount)
    return new LogControllerDecorator(cadastroController)

}