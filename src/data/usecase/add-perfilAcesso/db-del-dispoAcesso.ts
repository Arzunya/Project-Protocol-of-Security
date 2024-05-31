import { DelDispoAcesso, DelDispoAcessoModel } from "../../../domain/usecases/del-DispoAcesso";
import { HttpResponse } from "../../../presentention/protocols";
import { DelDispoAcessoRepository } from "../../protocols/del-DispoAcesso-repository";

export class DbDelDispoAcesso implements DelDispoAcesso {
  private readonly delAcessoRepository: DelDispoAcessoRepository;

  constructor(delAcessoRepository: DelDispoAcessoRepository) {
    this.delAcessoRepository = delAcessoRepository;
  }

  async del(perfil: DelDispoAcessoModel): Promise<HttpResponse> {
    const dispoAcesso = await this.delAcessoRepository.del(Object.assign({}, perfil));
    return dispoAcesso;
  }
}
