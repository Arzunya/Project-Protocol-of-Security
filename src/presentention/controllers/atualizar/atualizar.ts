import { HttpResponse, HttpRequest, Controller, AlterarAccount } from "./atualizar-protocol";
import { badRequest, serverError, ok } from "../../helpers/http-helper";


export class AtualizarController implements Controller {
  private readonly attAccount: AlterarAccount;

  constructor(addAccount: AlterarAccount) {
    this.attAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    const { id, matricula, nome, senha, setor, documento, responsavel, email, observacoes, empresa,
      PhotoData, tipo, status, nivel_usuario, ValidFrom, ValidTo } = httpRequest.body;
      
    const account = await this.attAccount.alt({
      id,
      matricula,
      nome,
      senha,
      setor,
      documento,
      responsavel,
      email,
      observacoes,
      empresa,
      PhotoData,
      tipo,
      status,
      nivel_usuario,
      ValidFrom,
      ValidTo
    });

    return ok(account); 
  }
}
