import { Controller } from "../../presentention/protocols"
import { AtualizarVeiculoPostgreRepository } from "../../infra/db/postgresdb/veiculo-repository/atualizarVeiculo"
import { DbAddVeiculo } from "../../data/usecase/add-veiculo/db-add-veiculo"
import { VeiculoController } from "../../presentention/controllers/veiculo/cadastro-veiculo"
import { ZonaControllerDecorator } from "../decorators/zona"

export const makeAttVeiculoController = (): Controller => {

    const atualizarVeiculoPostgreRepository = new AtualizarVeiculoPostgreRepository()
    const dbAddVeiculo = new DbAddVeiculo(atualizarVeiculoPostgreRepository)
    const veiculoController = new VeiculoController(dbAddVeiculo)
    return new ZonaControllerDecorator(veiculoController)
}