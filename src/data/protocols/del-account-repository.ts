import { DelAccountModel, DeletarContaModel, HttpResponse  } from "../../presentention/controllers/deletar/deletar-protocol";

export interface DelAccountRepository {
    del (accountDel: DeletarContaModel): Promise<HttpResponse>
}
