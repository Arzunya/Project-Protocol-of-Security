import { Controller } from "../../presentention/protocols"
import { AtualizarZonaPostgreRepository } from "../../infra/db/postgresdb/zonas-repository/atualizarZona"
import { DbAddZona } from "../../data/usecase/add-zona/db-add-zona"
import { ZonaController } from "../../presentention/controllers/zonas/cadastro-zonas"
import { ZonaControllerDecorator } from "../decorators/zona"

export const makeAttZonaController = (): Controller => {

    const atualizarZonaPostgreRepository = new AtualizarZonaPostgreRepository()
    const dbAddZona = new DbAddZona(atualizarZonaPostgreRepository)
    const zonaController = new ZonaController(dbAddZona)
    return new ZonaControllerDecorator(zonaController)
}