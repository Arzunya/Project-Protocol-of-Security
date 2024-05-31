import { DelPerfilAcesso, DelPerfilAcessoModel } from '../../../domain/usecases/del-perfilAcesso'
import { HttpResponse } from '../../../presentention/protocols'
import { DelAcessoRepository } from '../../protocols/del-acesso-repository'

export class DbDelPerfilAcesso implements DelPerfilAcesso {
    private readonly delAcessoRepository: DelAcessoRepository

    constructor(delAcessoRepository: DelAcessoRepository) {
        this.delAcessoRepository = delAcessoRepository
    }

    async del(perfil: DelPerfilAcessoModel): Promise<HttpResponse> {
        const perfilAcesso = await this.delAcessoRepository.del(Object.assign({}, perfil))
        return perfilAcesso
    }

}

