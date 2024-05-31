import { GetFoto , GetFotoModel} from "../../../domain/usecases/get-foto";
import { FotoModel } from "../../../domain/models/foto"
import { GetFotoRepository } from "../../protocols/get-foto-repository"

export class DbaFotos implements GetFoto {
    private readonly getFotoRepository: GetFotoRepository

    constructor(getFotoRepository: GetFotoRepository) {
        this.getFotoRepository = getFotoRepository
    }

    async get(DispositivosData: GetFotoModel): Promise<FotoModel> {
       const foto = await this.getFotoRepository.add(Object.assign({}, DispositivosData)) 
       return foto
    }
}
