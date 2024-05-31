import { DeletarAcessoModel, HttpResponse  } from "../../presentention/controllers/deletar-acesso/deletarAcesso-protocol";

export interface DelAcessoRepository {
    del (acessoDel: DeletarAcessoModel): Promise<HttpResponse>
}
