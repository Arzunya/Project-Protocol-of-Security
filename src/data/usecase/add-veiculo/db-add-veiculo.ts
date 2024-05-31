import { AddVeiculos, AddVeiculoModel } from "../../../domain/usecases/add-veiculo"
import { veiculoModel } from "../../../domain/models/veiculo"
import { AddVeiculoRepository } from "../../protocols/add-veiculo-repository"

export class DbAddVeiculo implements AddVeiculos {
    private readonly addVeiculoRepository: AddVeiculoRepository

    constructor(addVeiculoRepository: AddVeiculoRepository) {
        this.addVeiculoRepository = addVeiculoRepository

    }

    async add(accountData: AddVeiculoModel): Promise<veiculoModel> {
        const veiculo = await this.addVeiculoRepository.add(Object.assign({}, accountData))
        return veiculo
    }
}