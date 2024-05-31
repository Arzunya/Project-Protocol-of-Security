import { Controller } from "../../presentention/protocols";
import { DelDispositivoPostgreRepository } from '../../infra/db/postgresdb/dispositivos-respository/deletarDispositivo'
import { DbDelDispositivo } from '../../data/usecase/add-dispositivos/db-del-dispositivo'
import { DeletarDispositivoController } from '../../presentention/controllers/deletarDispositivo/deletarDispositivo'
import { DeleteDispositivoControllerDecorator } from '../decorators/deletarDispositivo'


export const makeDeletarDispositivoController = (): Controller => {

    const delDispositivoPostgreRepository = new DelDispositivoPostgreRepository()
    const dbDelDispositivo = new DbDelDispositivo(delDispositivoPostgreRepository)
    const deletarDispositivoController = new DeletarDispositivoController(dbDelDispositivo)
    return new DeleteDispositivoControllerDecorator(deletarDispositivoController)
}