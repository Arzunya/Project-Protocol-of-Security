import { Controller } from "../../presentention/protocols"
import { DelVeiculoPostgreRepository } from "../../infra/db/postgresdb/veiculo-repository/Deletarveiculo"
import { DbDelZona } from "../../data/usecase/del-zona/db-del-zona"
import { DeletarZonaController } from "../../presentention/controllers/deletar-zona/deletarZona"
import { DeleteControllerDecorator } from "../decorators/deletar"

export const makeDeletarVeiculoController = (): Controller => {

    const delVeiculoPostgreRepository = new DelVeiculoPostgreRepository()
    const dbDelZona = new DbDelZona(delVeiculoPostgreRepository)
    const deletarZonaController = new DeletarZonaController(dbDelZona)
    return new DeleteControllerDecorator(deletarZonaController)
}