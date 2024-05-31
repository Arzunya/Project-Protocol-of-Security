import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account"
import { AccountModel } from "../../../domain/models/account"
import { AddAccountRepository } from "../../protocols/add-account-repository"

export class DbAddAccount implements AddAccount {
    private readonly addAccountRepository: AddAccountRepository

    constructor(addAccountRepository: AddAccountRepository) {
        this.addAccountRepository = addAccountRepository

    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const account = await this.addAccountRepository.add(Object.assign({}, accountData))
        return account
    }
}