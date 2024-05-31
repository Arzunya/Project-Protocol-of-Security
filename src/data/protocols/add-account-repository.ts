import { AccountModel, AddAccountModel } from "../../presentention/controllers/cadastro/cadastro-protocols";

export interface AddAccountRepository {
    add (accountData: AddAccountModel): Promise<AccountModel>
}