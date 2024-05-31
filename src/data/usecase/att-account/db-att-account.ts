import { AlterarAccount, AttAccountModel } from "../../../domain/usecases/alterar-account"
import { AttAccountRepository } from "../../protocols/att-account-repository"

export class DbAttAccount implements AlterarAccount {
    private readonly attAccountRepository: AttAccountRepository

    constructor(addAccountRepository: AttAccountRepository) {
        this.attAccountRepository = addAccountRepository

    }

    async alt(accountData: AttAccountModel): Promise<AttAccountModel> {
        const account = await this.attAccountRepository.alt(Object.assign({}, accountData))
        return account
    }
}