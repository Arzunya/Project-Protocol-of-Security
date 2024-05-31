import { DispositivosController } from "../../presentention/controllers/dispositivos/dispositivos";
import { DbaDispositivos } from "../../data/usecase/add-dispositivos/db-add-dispositivos"
import { AttDispositivosPosgresRepository } from "../../infra/db/postgresdb/dispositivos-respository/attdispositivos"
import { LogControllerDecorator } from "../decorators/log"
import { Controller } from "../../presentention/protocols";

export const makeAttDispositivosController = (): Controller => {
    
    const attDispositivosPosgresRepository = new AttDispositivosPosgresRepository()
    const dbaDispositivos = new DbaDispositivos(attDispositivosPosgresRepository)
    const dispositivosController = new DispositivosController(dbaDispositivos)
    return new LogControllerDecorator(dispositivosController)
}
