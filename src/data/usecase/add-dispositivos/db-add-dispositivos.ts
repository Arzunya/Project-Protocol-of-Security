import { AddDispositivos, AddDispositivosModel} from "../../../domain/usecases/add-dispositivos";
import { DispositivosModel } from "../../../domain/models/dipositivos"
import { AddDispositivosRepository } from "../../protocols/add-dispositivo-repository"

export class DbaDispositivos implements AddDispositivos {
    private readonly addDispositiviosRepository: AddDispositivosRepository

    constructor(addDispositivosRepository: AddDispositivosRepository) {
        this.addDispositiviosRepository = addDispositivosRepository
    }

    async add(DispositivosData: AddDispositivosModel): Promise<DispositivosModel> {
       const aparelho = await this.addDispositiviosRepository.add(Object.assign({}, DispositivosData)) 
       return aparelho
    }
}
