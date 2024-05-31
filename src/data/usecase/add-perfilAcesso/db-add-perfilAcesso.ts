import { AddPerfilAcesso, AddPerfilAcessoModel} from "../../../domain/usecases/add-perfilDeAcesso"
import { PerfilAcessoModel } from "../../../domain/models/perfilAcesso"
import { AddPerfilAcessoRepository } from "../../protocols/add-perfilAcesso-repository"

export class DbAddPerfilAcesso implements AddPerfilAcesso {
    private readonly addPerfilAcessoRepository: AddPerfilAcessoRepository

    constructor(addPerfilAcessoRepository: AddPerfilAcessoRepository) {
        this.addPerfilAcessoRepository = addPerfilAcessoRepository
    }

    async add(PerfilAcessoData: AddPerfilAcessoModel): Promise<PerfilAcessoModel> {
        const perfilAcesso = await this.addPerfilAcessoRepository.add(Object.assign({}, PerfilAcessoData))
        return perfilAcesso
    }

}