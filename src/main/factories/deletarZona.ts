import { Controller } from "../../presentention/protocols"
import { DelZonaPostgreRepository } from "../../infra/db/postgresdb/zonas-repository/deletarZona"
import { DbDelZona } from "../../data/usecase/del-zona/db-del-zona"
import { DeletarZonaController } from "../../presentention/controllers/deletar-zona/deletarZona"
import { ZonaDelControllerDecorator } from "../decorators/zonaDel"

export const makeDeletarZonaController = (): Controller => {
    
    const delZonaPostgreRepository = new DelZonaPostgreRepository()
    const dbDelZona = new DbDelZona(delZonaPostgreRepository)
    const deletarZonaController = new DeletarZonaController(dbDelZona)
    return new ZonaDelControllerDecorator(deletarZonaController)
}

