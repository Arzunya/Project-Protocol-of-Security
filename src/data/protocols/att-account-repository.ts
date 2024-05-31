import { AltAccountModel, AttAccountModel } from "../../presentention/controllers/atualizar/atualizar-protocol";

export interface AttAccountRepository {
    alt (accountData: AttAccountModel): Promise<AltAccountModel>
}
