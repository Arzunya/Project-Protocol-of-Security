import { Controller } from "../../presentention/protocols"
import { VeiculoPostgreRepository } from "../../infra/db/postgresdb/veiculo-repository/veiculo"
import { DbAddVeiculo } from "../../data/usecase/add-veiculo/db-add-veiculo"
import { VeiculoController } from "../../presentention/controllers/veiculo/cadastro-veiculo"
import { VeiculoControllerDecorator } from "../decorators/veiculo"

export const makeVeiculoController = (): Controller => {

    const veiculoPostgreRepository = new VeiculoPostgreRepository()
    const dbAddVeiculo = new DbAddVeiculo(veiculoPostgreRepository)
    const veiculoController = new VeiculoController(dbAddVeiculo)
    return new VeiculoControllerDecorator(veiculoController)
}