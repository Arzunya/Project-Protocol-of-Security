import { Controller } from "../../presentention/protocols"
import { ZonaPostgreRepository } from "../../infra/db/postgresdb/zonas-repository/zonas"
import { DbAddZona } from "../../data/usecase/add-zona/db-add-zona"
import { ZonaController } from "../../presentention/controllers/zonas/cadastro-zonas"
import { ZonaControllerDecorator } from "../decorators/zona"

export const makeZonaController = (): Controller => {

    const zonaPostgreRepository = new ZonaPostgreRepository()
    const dbAddZona = new DbAddZona(zonaPostgreRepository)
    const zonaController = new ZonaController(dbAddZona)
    return new ZonaControllerDecorator(zonaController)
}